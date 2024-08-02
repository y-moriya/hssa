import dotenv from "dotenv";
import type { NextApiRequest, NextApiResponse } from 'next';
import { createConnection } from "@/utils/util";

dotenv.config()

const syncVideos = async (): Promise<boolean> => {
  const apiUrl = "https://holodex.net/api/v2/videos?status=past&type=stream&topic=singing&include=songs&org=Hololive&limit=25"
  const apiKey = process.env.HOLODEX_API_KEY
  if (!apiKey) {
    throw new Error("HOLODEX_API_KEY is not set")
  }
  const res = await fetch(apiUrl, {
    headers: {
      "X-APIKEY": apiKey,
    },
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch videos: ${res.statusText}`)
  }

  const conn = createConnection()

  try {
    await conn.connect()
    const favoriteChannels = await conn.query("SELECT channel_id FROM channels WHERE favorite = true")
    for (const video of await res.json()) {
      if (!favoriteChannels.rows?.find((row) => row[0] === video.channel.id)) {
        console.log(`Skipping video ${video.id} because channel ${video.channel.id} is not a favorite`)
        continue
      }

      if (!video.songs) {
        console.log(`Skipping video ${video.id} because it does not have songs`)
        continue
      }
      const existingVideo = await conn.query("SELECT data FROM singing_streams WHERE video_id = $1", { params: [video.id] });
      if (existingVideo.rows?.length) {
        const videoData = existingVideo.rows[0][0];
        if (videoData.songs) {
          console.log(`Video ${video.id} already exists and have songs field`);
          continue;
        }
      }

      const newVideo = await conn.query(
        `INSERT INTO singing_streams (channel_id, channel_name, video_id, title, data)
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT (video_id)
         DO UPDATE SET data = EXCLUDED.data
         RETURNING title`,
        { params: [video.channel.id, video.channel.name, video.id, video.title, video] }
      );

      console.log(newVideo)
    }

    return true
  } catch (error) {
    console.error('Error syncing videos:', error)
    return false
  } finally {
    await conn.close()
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const result = await syncVideos()
      if (result) {
        res.status(200).json({ message: 'Videos synced successfully' })
      } else {
        res.status(500).json({ error: 'Failed to sync videos' })
      }
    } catch (error) {
      res.status(500).json({ error })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
