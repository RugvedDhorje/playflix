"use client";
import { useUserById } from "@/hooks/useUsers";
import React from "react";

const ReviewUser = ({ id }: { id: string | null }) => {
  const { user } = useUserById(id);
  console.log(id);
  console.log("username:", user);
  return (
    <div>
      <h4 className="text-white text-[18px]">{user?.name}</h4>
    </div>
  );
};

export default ReviewUser;
