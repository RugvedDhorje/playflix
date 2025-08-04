import { supabaseAdmin } from "../../../../utils/supabaseClient";

export async function GET(request, { params }) {
  const { userId } = await params;

  try {
    const { data, error } = await supabaseAdmin
      .from("watch_history")
      .select(
        `
        id,
        watched_at,
        video:video_id (
          id,
          title,
          thumbnail_url,
          url
        )
      `
      )
      .eq("user_id", userId)
      .order("watched_at", { ascending: false });

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
