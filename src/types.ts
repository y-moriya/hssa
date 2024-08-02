export interface Video {
  id: string;
  title: string;
  type: string;
  topic_id: string;
  published_at: Date;
  available_at: Date;
  duration: number;
  status: string;
  songcount?: number;
  start_scheduled: Date;
  start_actual: Date;
  end_actual: Date;
  live_viewers?: number;
  description: string;
  clips?: Clip[];
  refers?: Refer[];
  songs?: Song[];
  channel: VideoChannel;
}

export interface VideoChannel {
  id: string;
  name: string;
  org: string;
  suborg: string;
  type: string;
  photo: string;
  english_name: string;
  view_count: number;
  video_count: number;
  subscriber_count: number;
  clip_count: number;
}

export interface Clip {
  id: string;
  lang: string;
  type: string;
  title: string;
  status: string;
  channel: ClipChannel;
  duration: number;
  available_at: Date;
}

export interface ClipChannel {
  id: string;
  name: string;
  photo: string;
}

export interface Refer {
  id: string;
  lang: null;
  type: string;
  title: string;
  status: string;
  channel: ReferChannel;
  duration: number;
  available_at: Date;
}

export interface ReferChannel {
  id: string;
  org: string;
  name: string;
  photo: string;
  english_name: string;
}

export interface Song {
  id: string;
  art: string;
  end: number;
  name: string;
  start: number;
  itunesid: number;
  original_artist: string;
}
