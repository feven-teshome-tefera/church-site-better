// import { NextApiRequest, NextApiResponse } from "next";
// import fs from "fs";
// import path from "path";
// import FormData from "form-data";
// import { getSupabaseClient } from "@/lib/supabase-client";

// const ARCHIVE_ACCESS_KEY = process.env.ARCHIVE_ACCESS_KEY!;
// const ARCHIVE_SECRET_KEY = process.env.ARCHIVE_SECRET_KEY!;

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== "POST") return res.status(405).end();

//   const { title, speaker } = req.body;
//   const file = req.body.file; // file from form upload (Multipart)

//   if (!file || !title || !speaker) return res.status(400).json({ error: "Missing fields" });

//   const itemId = title.replace(/\s+/g, "-") + "-" + Date.now();

//   // Upload to Archi ve.org via fetch (S3 API)
//   const form = new FormData();
//   form.append("file", fs.createReadStream(file.path));
//   form.append("metadata", JSON.stringify({ title, mediatype: "audio", collection: "audio" }));

//   const uploadRes = await fetch(`https://s3.us.archive.org/${itemId}/${file.name}`, {
//     method: "PUT",
//     body: fs.createReadStream(file.path),
//     headers: {
//       "Authorization": `LOW ${ARCHIVE_ACCESS_KEY}:${ARCHIVE_SECRET_KEY}`,
//     },
//   });

//   if (!uploadRes.ok) return res.status(500).json({ error: "Upload failed" });

//   const publicUrl = `https://archive.org/download/${itemId}/${file.name}`;

//   // Save in Supabase
//   const supabase = getSupabaseClient();
//   const { error } = await supabase.from("sermons").insert({
//     title,
//     speaker,
//     audiourl: publicUrl,
//     date: new Date(),
//   });

//   if (error) return res.status(500).json({ error: error.message });

//   res.status(200).json({ url: publicUrl });
// }
