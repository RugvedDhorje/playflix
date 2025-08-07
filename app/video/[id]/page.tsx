"use client";
import { useVideoById } from "@/hooks/useVideos";
import { useParams } from "next/navigation";
import React from "react";
import { Play } from "lucide-react";
// import { useReviewById } from "@/hooks/useReviews";
import Reviews from "@/components/Reviews";
import Link from "next/link";
import PlayButton from "@/components/PlayButton";
import Footer from "@/components/Footer";

const VideoPage = () => {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id ?? null;
  const { videos, loading, error } = useVideoById(id);
  // const { review } = useReviewById(id);
  if (videos == null) {
    return (
      <div className="min-h-screen bg-[#0d0f11] flex items-center justify-center">
        <div className="text-center">
          <div className="rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading Profile...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-[#0d0f11]">
      {/* Navbar */}
      <nav className="bg-[#0d0f11] overflow-hidden">
        <div className="max-w-screen-2xl mx-auto py-2 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center w-[100px] md:w-[200px]">
              <Link href="/">
                <img src="/images/logo.png" alt="Playflix Logo" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Section */}
      <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row items-center md:items-start w-full md:mt-10 px-4 sm:px-6 lg:px-8">
        {/* Text Section */}
        <div className="w-full md:w-1/2 md:pl-[50px] md:py-[50px] py-6 px-4 rounded-md mb-6 md:mb-0">
          <div className="text-white mt-6 md:mt-[100px]">
            <h1 className="text-white font-bold text-[36px] md:text-[60px] leading-tight">
              {videos?.title}
            </h1>
          </div>

          {/* Info Row */}
          <div className="text-white flex flex-wrap items-center gap-x-3 mt-2">
            <p className="font-medium text-[14px] md:text-[20px]">{videos?.year}</p>
            <span className="text-[18px] md:text-[30px]">•</span>
            <p className="text-[14px] md:text-[20px] font-medium">{videos?.language}</p>
            <span className="text-[18px] md:text-[30px]">•</span>
            <p className="text-[14px] md:text-[20px] font-medium">
              {videos?.duration &&
                `${Math.floor(videos.duration / 60)}h ${videos.duration % 60}m`}
            </p>
          </div>

          {/* Description */}
          <div className="text-white py-4">
            <p className="text-[14px] md:text-[20px]">{videos?.description}</p>
          </div>

          {/* Genres */}
          <div className="flex flex-wrap gap-2 text-[14px] md:text-[20px] font-medium">
            {videos?.genre_ids?.map((v, index) => (
              <p key={index} className="text-white">
                {v}
                {index !== videos.genre_ids.length - 1 && " |"}
              </p>
            ))}
          </div>

          {/* Play Button */}
          <div className="mt-4">
            <PlayButton videoId={videos?.id} />
          </div>
        </div>

        {/* Thumbnail Section */}
        <div className="relative w-full md:w-1/2 flex justify-center">
          <img
            className="h-[300px] sm:h-[500px] object-cover w-[80%] md:w-[70%] rounded-xl"
            src={videos?.thumbnail_url}
            alt={videos?.title}
          />
        </div>
      </div>

      {/* Reviews */}
      {id && <Reviews id={id} videoId={videos?.id} />}
      <Footer/>
    </div>
    // <div className="min-h-screen bg-[#0d0f11]">
    //   <nav className="bg-[#0d0f11] overflow-hidden">
    //     <div className=" max-w-screen-2xl mx-auto py-2 px-4 sm:px-6 lg:px-8">
    //       <div className="flex justify-between h-16">
    //         <div className="flex items-center w-[100px] md:w-[200px]">
    //           <Link href="/">
    //             <img src="/images/logo.png" alt="Playflix Logo" />
    //           </Link>
    //         </div>
    //       </div>
    //     </div>
    //   </nav>
    //   <div className="max-w-screen-2xl  md:h-auto mx-auto md:flex w-full md:mt-10 ">
    //     <div className="md:w-1/2 w-full md:pl-[100px] md:py-[50px] bg-yellow-900">
    //       <div className="text-white md:mt-[100px] ">
    //         <h1 className="text-white font-bold text-[36px] md:text-[60px]">
    //           {videos?.title}
    //         </h1>
    //       </div>
    //       <div className="text-white flex items-center gap-x-3">
    //         {/* <p className="text-white text-[20px]">{review[1]?.id}</p> */}
    //         {/* <span className="text-[30px]">•</span> */}

    //         <p className="font-medium text-[14px] md:text-[20px]">{videos?.year}</p>
    //         <span className="text-[20px] md:text-[30px]">•</span>
    //         <p className="text-[14px] md:text-[20px] font-medium">{videos?.language}</p>
    //         <span className="text-[20px] md:text-[30px]">•</span>
    //         <p className="text-[14px] md:text-[20px] font-medium">
    //           {" "}
    //           {videos?.duration &&
    //             `${Math.floor(videos.duration / 60)}h ${videos.duration % 60}m`}
    //         </p>
    //       </div>
    //       <div className="text-white py-4">
    //         <p className="text-[14px] md:text-[20px]">{videos?.description}</p>
    //       </div>
    //       <div className="flex gap-x-4 text-[14px] md:text-[20px] font-medium">
    //         {videos?.genre_ids?.map((v, index) => (
    //           <p key={index} className="text-white">
    //             {v} |
    //           </p>
    //         ))}
    //       </div>
    //       <PlayButton videoId={videos?.id} />
    //     </div>
    //     <div className="relative w-full md:w-1/2">
    //       <img
    //         className="absolute md:top-0 top-20 md:left-20 left-0 h-full object-cover w-3/5 rounded-xl"
    //         src={videos?.thumbnail_url}
    //         alt={videos?.title}
    //       />
    //     </div>
    //   </div>
    //   {id && <Reviews id={id} videoId={videos?.id} />}
    // </div>
  );
};

export default VideoPage;
