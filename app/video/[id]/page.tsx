"use client";
import { useVideoById } from "@/hooks/useVideos";
import { useParams } from "next/navigation";
import React from "react";
import { Play } from "lucide-react";
// import { useReviewById } from "@/hooks/useReviews";
import Reviews from "@/components/Reviews";

const VideoPage = () => {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id ?? null;
  const { videos, loading, error } = useVideoById(id);
  // const { review } = useReviewById(id);
  // if (loading) {
  //   return (
  //     <div className="min-h-screen bg-gray-50 flex items-center justify-center">
  //       <div className="text-center">
  //         <div className="rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
  //         <p className="mt-4 text-gray-600">Loading Profile...</p>
  //       </div>
  //     </div>
  //   );
  // }
  console.log(videos?.title);
  console.log(id);
  return (
    <div className="min-h-screen bg-[#0d0f11]">
      <nav className="bg-[#0d0f11] overflow-hidden">
        <div className=" max-w-screen-2xl mx-auto py-2 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center w-[200px]">
              <img src="/images/logo.png" alt="" />
            </div>
          </div>
        </div>
      </nav>
      <div className="max-w-screen-2xl mx-auto flex w-full mt-10 ">
        <div className="w-1/2 pl-[100px] py-[50px]">
          <div className="text-white mt-[100px] ">
            <h1 className="text-white font-bold text-[60px]">
              {videos?.title}
            </h1>
          </div>
          <div className="text-white flex items-center gap-x-3">
            {/* <p className="text-white text-[20px]">{review[1]?.id}</p> */}
            {/* <span className="text-[30px]">•</span> */}

            <p className="font-medium text-[20px]">{videos?.year}</p>
            <span className="text-[30px]">•</span>
            <p className="text-[20px] font-medium">{videos?.language}</p>
            <span className="text-[30px]">•</span>
            <p className="text-[20px] font-medium">
              {" "}
              {videos?.duration &&
                `${Math.floor(videos.duration / 60)}h ${videos.duration % 60}m`}
            </p>
          </div>
          <div className="text-white py-4">
            <p className="text-[20px]">{videos?.description}</p>
          </div>
          <div className="flex gap-x-4 text-[20px] font-medium">
            {videos?.genre_ids?.map((v, index) => (
              <p key={index} className="text-white">
                {v} |
              </p>
            ))}
          </div>
          <div className="flex gap-x-5 py-5">
            <button className="text-black bg-white rounded-full px-3 py-2 text-[20px] flex items-center justify-center gap-x-1">
              <Play />
              PLAY NOW
            </button>
            {/* <button className="text-white border-[1px] border-white rounded-md px-3 py-2 flex items-center gap-x-1">
              <Bookmark /> WATCH LATER
            </button> */}
          </div>
        </div>
        <div className="relative w-1/2">
          <img
            className="absolute top-0 left-20 h-full object-cover w-3/5 rounded-xl"
            src={videos?.thumbnail_url}
            alt={videos?.title}
          />
        </div>
      </div>
      {id && <Reviews id={id} />}
    </div>
  );
};

export default VideoPage;
