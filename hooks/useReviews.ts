import { review } from "@/types/review";
import { useEffect, useState } from "react";

interface SubmitReviewParams {
  user_id: string;
  video_id: string;
  rating: number;
  review_text: string;
}

interface SubmitReviewResult {
  submitReview: (params: SubmitReviewParams) => Promise<void>;
  loading: boolean;
  error: string | null;
  message: string | null;
}

export const useSubmitReview = (): SubmitReviewResult => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const submitReview = async ({
    user_id,
    video_id,
    rating,
    review_text,
  }: SubmitReviewParams): Promise<void> => {
    setLoading(true);
    setError(null);
    setMessage(null);

    if (!user_id || !video_id || !review_text) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    if (rating < 1 || rating > 10) {
      setError("Rating must be between 1 and 10.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id, video_id, rating, review_text }),
      });

      const result = await res.json();

      if (!res.ok) {
        setError(result.error || "Failed to submit review.");
      } else {
        setMessage("Review submitted successfully!");
      }
    } catch (err) {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return { submitReview, loading, error, message };
};

// export const useReviews = () => {
//   const [reviews, setReviews] = useState<review[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const fetchReview = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch("/api/reviews");
//       if (!response.ok) throw new Error("Failed to fetch reviews");
//       const data = await response.json();
//       setReviews(data);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "An error occurred");
//     } finally {
//       setLoading(false);
//     }
//   };
//   useEffect(() => {
//     fetchReview();
//   }, []);
//   return { loading, reviews, error, refetch: fetchReview };
// };

export const useReviewById = (videoId: string | null) => {
  const [review, setReview] = useState<review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchReviewByVideo = async (id: string) => {
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
