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
import { Event } from '@/lib/eventstore'
import { ministries } from '@/lib/ministriesstore'

interface EditminstryModalProps {
  open: boolean
  onClose: () => void
  minstry: ministries | null
  onUpdate: (updatedMinstry: ministries) => void
}

export function EditminstryModal({
  open,
  onClose,
  minstry,
  onUpdate
}: EditminstryModalProps) {
  const [formData, setFormData] = useState<ministries | null>(null)

  useEffect(() => {
    if (minstry) {
      setFormData(minstry)
    }
  }, [minstry])

  if (!formData) return null

function handleChange(
  e: React.ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >
) {
  const { name, value } = e.target
  setFormData(prev =>
    prev ? { ...prev, [name]: value } : prev
  )
}


  function handleSubmit() {
    onUpdate(formData!)
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Event</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
          />

          <Textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Short description"
          />

          <Textarea
            name="details"
            value={formData.details}
            onChange={handleChange}
            placeholder="Details"
          />

          

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
                onClick={handleSubmit}
                disabled={!formData.title || !formData.description || !formData.details}
                >
                Update Ministry
                </Button>

          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
