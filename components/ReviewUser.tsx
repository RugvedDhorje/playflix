"use client";
import { useUserById } from "@/hooks/useUsers";
import React from "react";

const ReviewUser = ({ id }: { id: string | null }) => {
  const { user } = useUserById(id);
  // console.log("Reviewuser", id);
  // console.log("username:", user);
  return (
    <div className="">
      <h4 className="text-gray-300 text-[24px]">{user?.name}</h4>
    </div>
  );
};

export default ReviewUser;
