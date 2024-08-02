// import type { NextApiRequest, NextApiResponse } from 'next';
// import type { Video } from '@/types';
// import { createConnection } from "@/utils/util";

// const getVideos = async (): Promise<Video[]> => {
//   const conn = createConnection()
//   try {
//     await conn.connect();
//     const res = await conn.query(`
//       SELECT * FROM singing_streams
//       WHERE
//         data->>'published_at' IS NOT NULL
//         AND LOWER(data->>'title') NOT LIKE '%unarchive%'
//         AND data->>'songs' IS NOT NULL
//         AND data->>'status' != 'missing'
//       ORDER BY data->>'published_at' DESC
//     `, { fetchCount: 10000 });

//     const videos = [];
//     for (const row of res.rows ?? []) {
//       const video = row[5] as Video;
//       if (video.published_at) {
//         video.published_at = new Date(video.published_at);
//       }
//       videos.push(video);
//     }
//     return videos;
//   } catch (error) {
//     console.error('Error fetching videos:', error);
//     throw error;
//   } finally {
//     await conn.close();
//   }
// };

// export const config = {
//   api: {
//     responseLimit: false,
//   },
// }

// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//   if (req.method === 'POST') {
//     try {
//       const videos = await getVideos();
//       res.status(200).json(videos);
//     } catch (error) {
//       res.status(500).json({ error: 'Failed to fetch videos' });
//     }
//   } else {
//     res.setHeader('Allow', ['POST'])
//     res.status(405).end(`Method ${req.method} Not Allowed`)
//   }
// };

// export default handler;
