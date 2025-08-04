import { useAuth } from "@/context/AuthContext";
import { useWatchHistoryPost } from "@/hooks/useWatchHistory";
import { Video } from "@/types/video";
import { useRouter } from "next/navigation";
import React from "react";

const MoviesList = ({ videos, title }: { videos: Video[]; title: string }) => {
  const router = useRouter();
  const {user} = useAuth()
  const {addHistory} = useWatchHistoryPost();

  const handleVideoClick = (id: string): void => {
  if (!user?.id) return;

  addHistory({ user_id: user.id, video_id: id }); // ✅ Correct object format
  router.push(`/video/${id}`);
};



  return (
    <div className="max-w-screen-2xl mx-auto p-5">
      <div>
        <h4 className="text-white text-[26px] font-semibold">{title}</h4>
      </div>
      <div className="flex gap-x-2 overflow-x-auto py-2 overflow-y-scroll no-scrollbar">
        {videos?.map((v) => (
          <div
            key={v.id}
            className="relative w-[180px] h-[240px] bg-white rounded-md shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-300 flex-shrink-0"
            onClick={() => handleVideoClick(v.id)}
          >
            {/* Cropped Image Container */}
            <div className="w-full h-[240px] overflow-hidden rounded-md">
              <img
                className="w-full h-full object-cover object-center hover:scale-105 duration-300"
                src={v.thumbnail_url}
                alt={v.title}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoviesList;
