"use client";
import { useReviewById } from "@/hooks/useReviews";
import React from "react";
import ReviewUser from "./ReviewUser";
import ReviewPost from "./ReviewPost";

const Reviews = ({ id, videoId }: { id: string | null; videoId: string }) => {
  const { review } = useReviewById(id);
  console.log("review :", review);
  return (
    <div className="max-w-screen-2xl mx-auto px-2 pb-10">
      <div className="max-w-screen-lg mx-auto">
        <h2 className="text-[24px] font-medium text-white">Reviews : </h2>
      </div>
      <div className=" text-white text-[18px] max-w-screen-lg mx-auto">
        {review?.map((r) => (
          <div
            key={r.id}
            className="bg-black/20 p-5 backdrop-blur-md my-4 rounded-xl shadow-lg"
          >
            <div className="flex items-center gap-x-4 mb-2">
              <img
                className="w-10 h-10 rounded-full border border-white/20"
                src="/images/user.png"
                alt="user"
              />
              <ReviewUser id={r?.user_id.toString()} />
              <p className="text-[14px] text-gray-300">
                {r?.created_at &&
                  new Date(r.created_at).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                  })}
              </p>
              <span className="ml-auto bg-gradient-to-r from-gray-800 to-gray-600 text-white text-sm px-3 py-1 rounded-full shadow-md">
                ⭐ {r?.rating}/10
              </span>
            </div>
            <p className="text-gray-400 text-[16px] px-2 leading-relaxed">
              {r?.review_text}
            </p>
          </div>
        ))}
      </div>
      <ReviewPost videoId={videoId} />
    </div>
  );
};

export default Reviews;
