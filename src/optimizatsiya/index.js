import { supabase } from "../supabase/supabaseConfig";

export async function getData() {
  let { data, error } = await supabase.from("imgs").select("*");
  if (error) {
    return "Nimadur hato ketti!";
  }
  console.log(data);

  return data;
}

export async function deleteData(id) {
  const response = await supabase.from("imgs").delete().eq("id", id);
  if (response == 204) {
    return "rasm ochirildi";
  } else {
    return "nimadur hato ketti !";
  }
}
