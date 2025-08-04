import { supabaseAdmin } from "../../../../../utils/supabaseClient";

export async function GET(request, { params }) {
  const { videoId } = await params;
  try {
    const { data, error } = await supabaseAdmin
      .from("reviews")
      .select("*")
      .eq("video_id", videoId);
    if (error) {
      return Response.json({ error: error.message }, { status: 400 });
    }
    return Response.json(data);
  } catch (error) {
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
