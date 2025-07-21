"use client";
import { useReviewById } from "@/hooks/useReviews";
import React from "react";
import ReviewUser from "./ReviewUser";

const Reviews = ({ id }: { id: string | null }) => {
  const { review } = useReviewById(id);
  console.log("review :", review);
  return (
    <div className="max-w-screen-2xl mx-auto">
      <div className=" text-white text-[20px]">
        {review?.map((r) => (
          <div className="border-[1px] border-white">
            <ReviewUser id={r?.user_id.toString()} />
            <p className="text-white text-[20px]">{r?.review_text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
