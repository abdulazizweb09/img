import { supabase } from "../supabase/supabaseConfig";

export async function getData() {
  let { data, error } = await supabase.from("imgs").select("*");
    if (error) {
      return "Nimadur hato ketti!";
  }
console.log(data);

  return data
}
