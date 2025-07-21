import { user } from "@/types/user";
import { useEffect, useState } from "react";

export const useUserById = (userId: string | null) => {
  const [user, setUSer] = useState<user | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchUserById = async (id: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/user/review/${id}`);
      if (!response.ok) throw new Error("Failed to fetch user data");
      const data = await response.json();
      setUSer(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (userId) {
      fetchUserById(userId);
    }
  }, [userId]);
  return { user, loading, error, fetchUserById };
};
