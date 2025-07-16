import { supabaseAdmin } from "../../../../../utils/supabaseClient";

export async function GET(request, { params }) {
  const { videoId } = params;
  try {
    const { data, error } = await supabaseAdmin
      .from("videos")
      .select("id")
      .eq("id", videoId)
      .single();
    if (error) {
      return Response.json({ error: error.message }, { status: 400 });
    }
    return Response.json(data);
  } catch (error) {
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
