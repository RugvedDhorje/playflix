"use client";
import { useAuth } from "@/context/AuthContext";
import { useVideos } from "@/hooks/useVideos";
import { supabaseAdmin } from "@/utils/supabaseClient";
import { useEffect, useState } from "react";

interface userProfile {
  id: string;
  name?: string;
  email?: string;
}
const HomePage = () => {
  const { user, signOut } = useAuth();
  const [userProfile, setUserProfile] = useState<userProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const { videos } = useVideos();
  useEffect(() => {
    if (user?.id) {
      fetchUserProfile();
    }
  }, [user]);
  const fetchUserProfile = async () => {
    try {
      const { data, error } = await supabaseAdmin
        .from("users")
        .select("*")
        .eq("id", user!.id)
        .single();
      if (error) throw error;
      setUserProfile(data);
    } catch (error) {
      console.log("Error using fetching user:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading Profile...</p>
        </div>
      </div>
    );
  }
  return (
    <div className=" min-h-screen">
      <nav className="relative h-[650px] bg-[#0d0f11] shadow overflow-hidden">
        <img
          className="absolute top-0 left-0 w-full h-full object-cover"
          src="https://res.cloudinary.com/dwh14vxwc/image/upload/v1744520541/company_images/zbtk9akt2lsckafwwakw.png"
          alt=""
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>
        <div className=" relative max-w-screen-2xl mx-auto py-2 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center w-[200px]">
              <img src="/images/logo.png" alt="" />
            </div>
            <div className="flex items-center gap-x-3">
              <div>
                <p className="text-[20px] font-light text-white">
                  {userProfile?.name}
                </p>
              </div>
              <div className="w-12">
                <img className="rounded-full" src="/images/user.png" alt="" />
              </div>
              <button
                onClick={handleSignOut}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-[18px] font-medium"
              >
                SignOut
              </button>
            </div>{" "}
          </div>
        </div>
      </nav>
      {/* <div>
        {videos.map((v) => (
          <div>
            <p className="text-white">{v.title}</p>
            <img src={v.thumbnail_url} alt="" />
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default HomePage;
