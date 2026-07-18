import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const sessionTokenFromUrl = window.location.pathname.slice(1);
console.log(sessionTokenFromUrl)
export const supabase = createClient<Database>(supabaseUrl, supabasePublishableKey, {
    global: {
        headers: {
            "x-session-token": sessionTokenFromUrl,
        },
    },
});
