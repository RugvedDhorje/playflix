export interface Video {
  id: string;
  title: string;
  thumbnail_url: string;
  url: string;
  genre_ids: number[];
  description?: string;
  duration?: number;
  created_at?: string;
  year?: number;
  language?: string;
}

export interface WatchHistoryItem {
  id: string;
  watched_at: string;
  video: Video;
}

export interface Genre {
  id: number;
  name: string;
}
