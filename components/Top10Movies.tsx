import { useAuth } from "@/context/AuthContext";
import { useVideos } from "@/hooks/useVideos";
import { useWatchHistoryPost } from "@/hooks/useWatchHistory";
import { Video } from "@/types/video";
import { useRouter } from "next/navigation";
import React from "react";

const Top10Movies = () => {
  const router = useRouter();
  const { user } = useAuth()
  const { addHistory } = useWatchHistoryPost();
  const { videos } = useVideos();

  const handleVideoClick = (id: string): void => {
    if (!user?.id) return;

    addHistory({ user_id: user.id, video_id: id }); // ✅ Correct object format
    router.push(`/video/${id}`);
  };


  const overlayImages = [
    'https://res.cloudinary.com/dxswkuhfi/image/upload/v1753076541/overlay-1_i23eal.webp',
    "https://res.cloudinary.com/dxswkuhfi/image/upload/v1753076541/overlay-2_drblww.webp",
    "https://res.cloudinary.com/dxswkuhfi/image/upload/v1753076541/overlay-3_jragux.webp",
    "https://res.cloudinary.com/dxswkuhfi/image/upload/v1753076541/overlay-4_lbfpzj.webp",
    "https://res.cloudinary.com/dxswkuhfi/image/upload/v1753076541/overlay-5_s5nrcq.webp",
    "https://res.cloudinary.com/dxswkuhfi/image/upload/v1753076541/overlay-6_qmchac.webp",
    "https://res.cloudinary.com/dxswkuhfi/image/upload/v1753076546/overlay-7_zcgmlo.webp",
    "https://res.cloudinary.com/dxswkuhfi/image/upload/v1753076546/overlay-8_aqlauc.webp",
    "https://res.cloudinary.com/dxswkuhfi/image/upload/v1753076546/overlay-9_jlikym.webp",
    "https://res.cloudinary.com/dxswkuhfi/image/upload/v1753076546/overlay-10_w5gyqv.webp"
  ];

  return (
    <div className="max-w-screen-2xl mx-auto p-5">
      <div>
        <h4 className="text-white text-[24px] md:text-[26px] font-semibold">{"Top 10 in India Today"}</h4>
      </div>
      <div className="flex gap-x-2 overflow-x-auto py-2 overflow-y-scroll no-scrollbar">
        {videos?.slice(0, 10).map((v, index) => (
          <div
            key={v.id}
            className="relative w-[180px] h-[240px] bg-white rounded-md shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-300 flex-shrink-0"
            onClick={() => handleVideoClick(v.id)}
          >
            <div className="w-full h-[240px] overflow-hidden rounded-md relative">
              {/* Main video thumbnail */}
              <img
                className="w-full h-full object-cover object-center hover:scale-105 duration-300"
                src={v.thumbnail_url}
                alt={v.title}
              />

              {/* Dynamic Overlay image */}
              <img
                src={overlayImages[index % overlayImages.length]} // cycles if more videos than overlays
                alt="overlay"
                className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Top10Movies;
