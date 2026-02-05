
import { getSupabaseClient } from "@/lib/supabase-client";

export interface Event {
  id: number
  created_at: string
  title: string
  description: string
  details: string
  date: string
  time: string
  location: string
  category: string
}
export async function loadEvents(): Promise<Event[]> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.from("events").select("*");

  if (error) {
    console.error("Error fetching events:", error);
    return [];
  }

  return data || [];
}
