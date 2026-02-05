'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { getSupabaseClient } from '@/lib/supabase-client'
import { paster } from '@/lib/pasterstore'

interface EditpasterModalProps {
  open: boolean
  onClose: () => void
  paster: paster | null
  onUpdate: (updatedPaster: paster) => void
}

const supabase = getSupabaseClient()

export function EditpasterModal({
  open,
  onClose,
  paster,
  onUpdate
}: EditpasterModalProps) {
  const [formData, setFormData] = useState<paster | undefined>(undefined)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (paster) {
      setFormData(paster)
      setImageFile(null)
    }
  }, [paster])

  if (!formData) return null

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => (prev ? { ...prev, [name]: value } : prev))
  }

  const uploadImage = async (file: File) => {
    const fileName = `pasters/${Date.now()}-${file.name}`

    const { error } = await supabase.storage
      .from('pastors-images')
      .upload(fileName, file)

    if (error) throw error

    const { data } = supabase.storage
      .from('pastors-images')
      .getPublicUrl(fileName)

    return data.publicUrl
  }

  const handleSubmit = async () => {
    if (!formData) return

    try {
      setUploading(true)
      let imageUrl = formData.image

      if (imageFile) {
        imageUrl = await uploadImage(imageFile)
      }

      const updatedPaster: paster = {
        ...formData,
        image: imageUrl
      }

      onUpdate(updatedPaster)
      onClose()
    } catch (err) {
      console.error(err)
      alert('Failed to update pastor')
    } finally {
      setUploading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Pastor</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
          />

          <Input
            name="position"
            value={formData.position}
            onChange={handleChange}
            placeholder="Position"
          />

          <Textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
          />

          {/* Image upload */}
          <Input
            type="file"
            accept="image/*"
            onChange={e => setImageFile(e.target.files?.[0] || null)}
          />

          {/* Preview current image */}
          {formData.image && (
            <img
              src={formData.image}
              alt="Pastor"
              className="h-24 rounded-md object-cover"
            />
          )}

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>

            <Button
              onClick={handleSubmit}
              disabled={
                uploading ||
                !formData.name ||
                !formData.position ||
                !formData.description
              }
            >
              {uploading ? 'Uploading...' : 'Update Pastor'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
