// /app/api/delete-cloudinary/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'

// Configure Cloudinary using server-side env variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(req: NextRequest) {
  try {
    const { publicId } = await req.json()

    if (!publicId) {
      return NextResponse.json({ error: 'No publicId provided' }, { status: 400 })
    }

    // Use 'raw' resource type for audio files
    const result = await cloudinary.uploader.destroy(publicId, { resource_type: 'raw' })
    console.log('Delete result:', result)

    return NextResponse.json({ success: true, result })
  } catch (err) {
    console.error('Cloudinary delete error:', err)
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}
