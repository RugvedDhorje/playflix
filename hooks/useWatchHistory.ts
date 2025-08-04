import { WatchHistory} from "@/types/video";
import { useEffect, useState } from "react";

interface AddHistoryParams {
  user_id: string;
  video_id: string;
}
interface AddHistoryResult {
  addHistory: (params: AddHistoryParams) => Promise<void>;
  loading: boolean;
  error: string | null;
  message: string | null;
}
export const useWatchHistoryPost = (): AddHistoryResult => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const addHistory = async ({
    user_id,
    video_id,
  }: AddHistoryParams): Promise<void> => {
    setLoading(true);
    setError(null);
    setMessage(null);

    if (!user_id || !video_id) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }
    try {
      const res = await fetch("/api/watch-history", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id, video_id }),
      });
      const result = await res.json();
      if (!res.ok) {
        setError(result.error || "Failed to add history");
      } else {
        setMessage("History added");
      }
    } catch (err) {
      setError("Something went wrong");
    }
  };
  return { addHistory, loading, error, message };
};

export const useWatchHistoryById = (userId:string |null) =>{
  const [watchHistory,setWatchHistory] = useState<WatchHistory[]>([]);
  const [lodaing,setLoading] = useState(true);
  const [error,setError] = useState<string | null>(null);
  const fetchWatchHistoryById = async (id:string) =>{
    try {
      setLoading(true);
      const response = await fetch(`/api/watch-history/${id}`);
      if(!response.ok) throw new Error("Filed to fetch data")
      const data = await response.json();
      setWatchHistory(data);
    } catch (err) {
      setError(err instanceof Error ?err.message : "A error occured");
    }finally{
      setLoading(false);
    }
  }
  useEffect(()=>{
    if(userId){
      fetchWatchHistoryById(userId);
    }
  },[userId])
  return {watchHistory,lodaing,error,refetch:fetchWatchHistoryById}
}