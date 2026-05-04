import { createClient } from "@supabase/supabase-js";

const projectID = "hysdpqistsxwskcopfwh";
export const supabaseUrl = `https://${projectID}.supabase.co`;

// const supabaseKey = process.env.SUPABASE_KEY;
const supabaseKey = "sb_publishable_DB31uD3uNhtB4tRFik4ZmQ_xIaU8DYt";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
