"use client";
import Footer from "@/components/Footer";
import HomePage from "@/components/HomePage";
import ProtectedRoute from "@/components/ProtectedRoutes";
// import { AuthProvider } from "@/context/AuthContext";
// import Image from "next/image";

export default function Home() {
  return (
    <div>
      <ProtectedRoute>
        <HomePage />
        <Footer/>
      </ProtectedRoute>
    </div>
  );
}
