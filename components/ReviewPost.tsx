"use client";
import { useAuth } from "@/context/AuthContext";
import { useSubmitReview } from "@/hooks/useReviews";
import { useState, FormEvent } from "react";

const ReviewPost = ({ videoId }: { videoId: string }) => {
  const { user } = useAuth();
  const [review, setReview] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const { submitReview, loading, error, message } = useSubmitReview();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await submitReview({
      user_id: user!.id,
      video_id: videoId,
      rating: rating,
      review_text: review,
    });

    setReview("");
    setRating(0);
  };

  return (
    <div className="bg-black/20 backdrop-blur-md text-white max-w-screen-lg p-5 mx-auto rounded-xl shadow-lg mt-8">
      <h2 className="text-[24px] font-semibold mb-4">Write a Review</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          {error && <p className="text-red-500">{error}</p>}
          {message && <p className="text-green-500">{message}</p>}
          <textarea
            id="review"
            name="review"
            rows={4}
            required
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="w-full rounded-md bg-black/30 p-3 text-white placeholder-white/50 focus:outline-none"
            placeholder="Share your thoughts..."
          />
        </div>

        <div>
          <label htmlFor="rating" className="block mb-1 text-white/70">
            Rating (1 to 10)
          </label>
          <div className="flex gap-x-10">
            <input
              type="number"
              id="rating"
              name="rating"
              min={1}
              max={10}
              required
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-24 rounded-md bg-white/5 p-2 text-white placeholder-white/50 focus:outline-none"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-gray-700 text-white rounded-md shadow hover:opacity-90 transition-all"
            >
              Submit Review
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ReviewPost;
