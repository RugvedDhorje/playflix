import { supabaseAdmin } from "../../../utils/supabaseClient";

export async function POST(request) {
  try {
    const { user_id, video_id } = await request.json();

    if (!user_id || !video_id) {
      return Response.json(
        { error: "user_id and video_id are required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin.from("watch_history").insert([
      {
        user_id,
        video_id,
        watched_at: new Date(),
      },
    ]);

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json(
      { message: "Watch history updated", data },
      { status: 201 }
    );
  } catch (error) {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
