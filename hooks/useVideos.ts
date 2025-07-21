import { useState, useEffect } from "react";
import { Video, WatchHistoryItem } from "@/types/video";

// export const useVideos = () => {
//   const [videos, setVideos] = useState<Video[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const fetchVideos = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch("/api/videos");
//       if (!response.ok) throw new Error("Failed to fetch videos");
//       const data = await response.json();
//       setVideos(data);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "An error occurred");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchVideos();
//   }, []);

//   return { videos, loading, error, refetch: fetchVideos };
// };

export const useVideos = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchVideos = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/videos");
      if (!response.ok) throw new Error("Failed to fetch videos");
      const data = await response.json();
      setVideos(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchVideos();
  }, []);
  return { videos, loading, error, refetch: fetchVideos };
};

// export const useVideosByGenre = (genreId: number | null) => {
//   const [videos, setVideos] = useState<Video[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const fetchVideosByGenre = async (id: number) => {
//     try {
//       setLoading(true);
//       const response = await fetch(`/api/videos/genre/${id}`);
//       if (!response.ok) throw new Error("Failed to fetch videos by genre");
//       const data = await response.json();
//       setVideos(data);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "An error occurred");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (genreId) {
//       fetchVideosByGenre(genreId);
//     }
//   }, [genreId]);

//   return { videos, loading, error, fetchVideosByGenre };
// };

export const useVideoById = (VideoId: string | null) => {
  const [videos, setVideos] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, SetError] = useState<string | null>(null);

  const fetchVideosByVideoId = async (id: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/videos/${id}`);
      if (!response.ok) throw new Error("Failed to fetch the videos");
      const data = await response.json();
      setVideos(data);
    } catch (err) {
      SetError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (VideoId) {
      fetchVideosByVideoId(VideoId);
    }
  }, [VideoId]);
  return { videos, loading, error, fetchVideosByVideoId };
};

// export const useVideoById = (videoId: number | null) => {
//   const [video, setVideo] = useState<Video[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const fetchVideoById = async (id:number)=>{
//     setLoading(true);
//     const response = await fetch(`api/videos/`)
//   }
// };

export const useWatchHistory = (userId: string | null) => {
  const [history, setHistory] = useState<WatchHistoryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWatchHistory = async (id: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/watch-history/${id}`);
      if (!response.ok) throw new Error("Failed to fetch watch history");
      const data = await response.json();
      setHistory(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const addToWatchHistory = async (videoId: string) => {
    if (!userId) return;

    try {
      const response = await fetch("/api/watch-history", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          video_id: videoId,
        }),
      });

      if (!response.ok) throw new Error("Failed to add to watch history");

      // Refresh history after adding
      fetchWatchHistory(userId);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  useEffect(() => {
    if (userId) {
      fetchWatchHistory(userId);
    }
  }, [userId]);

  return {
    history,
    loading,
    error,
    addToWatchHistory,
    refetch: () => userId && fetchWatchHistory(userId),
  };
};
