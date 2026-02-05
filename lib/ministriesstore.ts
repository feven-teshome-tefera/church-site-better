import { getSupabaseClient } from "@/lib/supabase-client";

export interface ministries {
  id: number;
  created_at: string;
  title: string;
  description: string;
  details: string;
  link: string ;
}

export async function loadMinistries(): Promise<ministries[]> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.from("ministries").select("*");

  if (error) {
    console.error("Error fetching Ministries:", error);
    return [];
  }

  return data || [];
}
