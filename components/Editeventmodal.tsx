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

interface EditEventModalProps {
  open: boolean
  onClose: () => void
  event: Event | null
  onUpdate: (updatedEvent: Event) => void
}

export function EditEventModal({
  open,
  onClose,
  event,
  onUpdate
}: EditEventModalProps) {
  const [formData, setFormData] = useState<Event | null>(null)

  useEffect(() => {
    if (event) {
      setFormData(event)
    }
  }, [event])

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

          <Input
            type="text"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />

          <Input
            type="text"
            name="time"
            value={formData.time}
            onChange={handleChange}
          />

          <Input
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
          />

          <select name="category" value={formData.category} 
          onChange={handleChange}
          className="w-full border p-2">
              <option value="">Category</option>
              <option value="conference">Conference</option>
              <option value="service">Service</option>
              <option value="youth">Youth</option>
              <option value="worship">Worship</option>
              <option value="other">Other</option>
            </select>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
                onClick={handleSubmit}
                disabled={!formData.title || !formData.date || !formData.time}
                >
                Update Event
                </Button>

          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
