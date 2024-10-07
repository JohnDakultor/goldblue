// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://cydigdwxwsxlvfxdojax.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN5ZGlnZHd4d3N4bHZmeGRvamF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgyMjk1NDIsImV4cCI6MjA0MzgwNTU0Mn0.yKvBZ4_5XD77-PBbRv5q04Flzyof5xz00G9dRxr9YSQ"

export default supabase = createClient(supabaseUrl, supabaseAnonKey);
