import { getSupabaseClient } from "./supabase-client"

export interface paster {
  id:number
  name: string
  position: string
  description: string
  image: string
  
}

let cachedPastors: paster[] | null = null;

export async function loadPastors(): Promise<paster[]> {
  if (cachedPastors) return cachedPastors;

  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("pasters")
    .select("*");

  if (error) {
    console.error("Error fetching pastors:", error);
    cachedPastors = [];
  } else {
    cachedPastors = data || [];
  }

  return cachedPastors;
}
