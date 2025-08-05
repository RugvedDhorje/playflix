import { useAuth } from "@/context/AuthContext";
import { useWatchHistoryById } from "@/hooks/useWatchHistory";
import { WatchHistory } from "@/types/video";
import { useRouter } from "next/navigation";
import React from "react";

const WatchHistoryList = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { watchHistory, lodaing, error } = useWatchHistoryById(user!.id);

  const handleVideoClick = (id: string | number): void => {
    router.push(`/video/${id}`); // adjust the route as needed
  };

  return (
    <div className="max-w-screen-2xl mx-auto p-5">
      <div>
        <h4 className="text-white text-[26px] font-semibold">{"Continue Watching"}</h4>
      </div>
      <div className="flex gap-x-2 overflow-x-auto py-2 overflow-y-scroll no-scrollbar">
        {watchHistory?.map((v) => (
          <div
            key={v.id}
            className="relative w-[180px] h-[240px] bg-white rounded-md shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-300 flex-shrink-0"
            onClick={() => handleVideoClick(v.video.id)}
          >
            {/* Cropped Image Container */}
            <div className="w-full h-[240px] overflow-hidden rounded-md">
              <img
                className="w-full h-full object-cover object-center hover:scale-105 duration-300"
                src={v.video.thumbnail_url}
                alt={v.video.title}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WatchHistoryList;
