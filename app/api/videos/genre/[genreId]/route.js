import { supabaseAdmin } from "../../../../../utils/supabaseClient";

export async function GET(request, { params }) {
  const { genreId } = params;

  try {
    const { data, error } = await supabaseAdmin
      .from("videos")
      .select("*")
      .filter("genre_ids", "cs", `{${genreId}}`);

    if (error) {
      return Response.json({ error: error.message }, { status: 400 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
