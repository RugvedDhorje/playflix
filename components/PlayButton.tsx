import { useAuth } from "@/context/AuthContext";
import { useWatchHistoryPost } from "@/hooks/useWatchHistory";
import { Play } from "lucide-react";
import React from "react";

const PlayButton = ({ videoId }: { videoId: string }) => {
  const { user } = useAuth();
  const { addHistory } = useWatchHistoryPost();
  const handleAddHistory = async () => {
    await addHistory({
      user_id: user!.id,
      video_id: videoId,
    });
  };
  return (
    <div className="flex gap-x-5 py-5">
      <button
        onClick={handleAddHistory}
        className="text-black bg-white rounded-full px-2 md:px-4 md:py-3 py-1 font-medium text-[14px] md:text-[16px] flex items-center justify-center gap-x-1"
      >
        <Play className=" w-4 md:w-5"/>
        PLAY NOW
      </button>
      {/* <button className="text-white border-[1px] border-white rounded-md px-3 py-2 flex items-center gap-x-1">
              <Bookmark /> WATCH LATER
            </button> */}
    </div>
  );
};

export default PlayButton;
