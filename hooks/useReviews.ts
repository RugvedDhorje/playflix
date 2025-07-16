import { review } from "@/types/review";
import { useEffect, useState } from "react";

export const useReviews = () => {
  const [reviews, setReviews] = useState<review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchReview = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/reviews");
      if (!response.ok) throw new Error("Failed to fetch reviews");
      const data = await response.json();
      setReviews(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchReview();
  }, []);
  return { loading, reviews, error, refetch: fetchReview };
};

export const useReviewById = (videoId: number | null) => {
  const [review, setReview] = useState<review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchReviewByVideo = async (id: number) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/reviews/videos/${id}`);
      if (!response.ok) throw new Error("Failed to fetch review");
      const data = await response.json();
      setReview(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (videoId) {
      fetchReviewByVideo(videoId);
    }
  }, [videoId]);
  return { review, loading, error, refetch: fetchReviewByVideo };
};
