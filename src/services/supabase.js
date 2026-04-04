import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://hysdpqistsxwskcopfwh.supabase.co";
const projectID = "hysdpqistsxwskcopfwh";

// const supabaseKey = process.env.SUPABASE_KEY;
const supabaseKey = "sb_publishable_DB31uD3uNhtB4tRFik4ZmQ_xIaU8DYt";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
