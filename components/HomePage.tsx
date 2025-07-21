"use client";
import { useAuth } from "@/context/AuthContext";
import { useVideos } from "@/hooks/useVideos";
import { supabaseAdmin } from "@/utils/supabaseClient";
import { useEffect, useState } from "react";
import { Bookmark, Play } from "lucide-react";
import MoviesList from "./MoviesList";

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
  //   const { review } = useReviewById(Number(videos[1]?.id));
  //   const [video, setVideo] = useState([]);
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
    <div className="min-h-screen bg-[#0d0f11]">
      <nav className="relative h-[750px] bg-[#0d0f11] shadow overflow-hidden">
        <img
          className="absolute top-0 left-0 w-full h-full object-cover"
          //   src="https://res.cloudinary.com/dwh14vxwc/image/upload/v1744520541/company_images/zbtk9akt2lsckafwwakw.png"
          //   src="https://wallpapercave.com/wp/wp8807385.jpg"
          src="https://nofilmschool.com/media-library/image.jpg?id=58401470&width=980"
          alt=""
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black/60"></div>
        <div className=" relative max-w-screen-2xl mx-auto py-2 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center w-[200px]">
              <img src="/images/logo.png" alt="" />
            </div>
            <div className="flex items-center gap-x-3">
              <div>
                <p className="text-[20px] font-light text-white bg-gradient-to-t from-black to-transparent px-2 rounded-full">
                  {userProfile?.name}
                </p>
              </div>
              <div className="w-12">
                <img className="rounded-full" src="/images/user.png" alt="" />
              </div>
              <button
                onClick={handleSignOut}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full text-[18px] font-medium"
              >
                SignOut
              </button>
            </div>
          </div>
          <div className="text-white mt-[200px]">
            <h1 className="text-white font-bold text-[60px]">
              {videos[1]?.title}
            </h1>
          </div>
          <div className="text-white flex items-center gap-x-3">
            {/* <p className="text-white text-[20px]">{review[1]?.id}</p> */}
            {/* <span className="text-[30px]">•</span> */}

            <p className="font-medium text-[20px]">{videos[1]?.year}</p>
            <span className="text-[30px]">•</span>
            <p className="text-[20px] font-medium">{videos[1]?.language}</p>
            <span className="text-[30px]">•</span>
            <p className="text-[20px] font-medium">
              {" "}
              {videos[1]?.duration &&
                `${Math.floor(videos[1].duration / 60)}h ${
                  videos[1].duration % 60
                }m`}
            </p>
          </div>
          <div className="text-white py-4 max-w-2xl">
            <p className="text-[20px]">{videos[1]?.description}</p>
          </div>
          <div className="flex gap-x-4 text-[20px] font-medium">
            {videos[1]?.genre_ids?.map((v, index) => (
              <p key={index} className="text-white">
                {v} |
              </p>
            ))}
          </div>
          <div className="flex gap-x-5 py-5">
            <button className="text-white bg-red-600 hover:text-red-600 hover:bg-white duration-300  rounded-full px-4 py-2 text-[20px] flex items-center justify-center gap-x-1">
              <Play />
              PLAY NOW
            </button>
            <button className="text-white border-[1px] border-white rounded-full text-[20px] px-4 py-2 flex items-center gap-x-1 hover:bg-white hover:text-black transition duration-300">
              <Bookmark /> WATCH LATER
            </button>
          </div>
        </div>
      </nav>
      <MoviesList videos={videos} title="Recommended" />
    </div>
  );
};

export default HomePage;
