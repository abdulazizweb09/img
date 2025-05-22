import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://mughzhnthdmxwabbikgz.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im11Z2h6aG50aGRteHdhYmJpa2d6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NzgzNzU2MCwiZXhwIjoyMDYzNDEzNTYwfQ.nppXSKlAHk3UuPwcz9Z-0fU8OrO0qzaA7zlQUJI7UGQ";
export const supabase = createClient(supabaseUrl, supabaseKey);