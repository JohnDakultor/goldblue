
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabaseClient= createClient(supabaseUrl, supabaseAnonKey);

const token = localStorage.getItem("jwt");
if (token) {
    supabaseClient.auth.setAuth(token);
}


export default supabaseClient;  
