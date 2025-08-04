import { supabaseAdmin } from "../../../utils/supabaseClient";

export async function POST(request) {
  try {
    const { user_id, video_id, rating, review_text } = await request.json();
    if (!user_id || !video_id || !review_text) {
      return Response.json({ error: "Fill all the Fields" }, { status: 400 });
    }
    if (rating < 1 || rating > 10) {
      return Response.json(
        {
          error: "Rating must be between 1 and 10",
        },
        { status: 400 }
      );
    }
    // check user exist
    const { data: user, error: userError } = await supabaseAdmin
      .from("users")
      .select("id")
      .eq("id", user_id)
      .single();
    if (userError || !user) {
      return Response.json(
        {
          error: "User not Found",
        },
        { status: 404 }
      );
    }
    // check video exist
    const { data: video, error: videoError } = await supabaseAdmin
      .from("videos")
      .select("id")
      .eq("id", video_id)
      .single();
    if (!video || videoError) {
      return Response.json(
        {
          error: "Video not Found",
        },
        {
          status: 404,
        }
      );
    }
    const { data: review, error: reviewError } = await supabaseAdmin
      .from("reviews")
      .insert([{ user_id, video_id, rating, review_text }])
      .select(`*,users:user_id(id,name)`)
      .single();
    if (reviewError) {
      if (reviewError.code === "23505") {
        return Response.json(
          {
            error: "You already have reviewed this video.",
          },
          {
            status: 409,
          }
        );
      }
      console.log(" Error creating review:", reviewError);
      return Response.json(
        {
          error: "Failed to create review",
        },
        {
          status: 500,
        }
      );
    }
    return Response.json(
      {
        message: "Review Created Successfully!",
        review,
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      {
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}
