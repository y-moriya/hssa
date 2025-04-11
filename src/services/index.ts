import type { UseVideosInput, UseVideosResponse, Video } from "@/types";
import { createConnection } from "@/utils/util";

const getVideos = async (): Promise<Video[]> => {
  const conn = createConnection();
  try {
    await conn.connect();

    const res = await conn.query(`
      SELECT * FROM singing_streams
      WHERE
        data->>'published_at' IS NOT NULL
        AND LOWER(data->>'title') NOT LIKE '%unarchive%'
        AND data->>'songs' IS NOT NULL
        AND data->>'status' != 'missing'
      ORDER BY data->>'published_at' DESC
    `, { fetchCount: 10000 });

    const videos = [];
    for (const row of res.rows ?? []) {
      const video = row[5] as Video;
      if (video.published_at) {
        video.published_at = new Date(video.published_at);
      }
      videos.push(video);
    }
    return videos;
  } catch (error) {
    console.error('Error fetching videos:', error);
    throw error
  } finally {
    await conn.close();
  }
};

// const getAllVideosFn: ({
//   sorting,
//   columnFilters,
//   pagination,
// }: UseVideosInput) => Promise<UseVideosResponse> = async ({ sorting, columnFilters, pagination }): UseVideosInput => {
//   const page = pagination.pageIndex + 1;

//   // TODO: implement
// }

export { getVideos };
