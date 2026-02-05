'use client'

import { getSupabaseClient } from '@/lib/supabase-client'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Edit2, Trash2, Plus } from 'lucide-react'
import { loadPastors, paster } from '@/lib/pasterstore'
import { EditpasterModal } from './Editpastermodule'

export default function PasterModule() {
  const supabase = getSupabaseClient()

  const [pasters, setPasters] = useState<paster[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [editingPaster, setEditingPaster] = useState<paster | null>(null)

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    position: ''
  })

  const [imageFile, setImageFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)

  /* -------------------- LOAD DATA -------------------- */
  useEffect(() => {
    loadPastors().then(setPasters)
  }, [])

  /* -------------------- IMAGE UPLOAD -------------------- */
  const uploadImage = async (file: File) => {
    const fileName = `${Date.now()}-${file.name}`

    const { error } = await supabase.storage
      .from('pastors-images')
      .upload(fileName, file)

    if (error) throw error

    const { data } = supabase.storage
      .from('pastors-images')
      .getPublicUrl(fileName)

    return data.publicUrl
  }

  /* -------------------- ADD PASTER -------------------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!imageFile) {
      alert('Please select an image')
      return
    }

    try {
      setUploading(true)

      const imageUrl = await uploadImage(imageFile)

      const { data, error } = await supabase
        .from('pasters')
        .insert([
          {
            ...formData,
            image: imageUrl
          }
        ])
        .select()
        .single()

      if (error) throw error

      setPasters(prev => [...prev, data])
      setFormData({ name: '', description: '', position: '' })
      setImageFile(null)
      setIsOpen(false)
    } catch (err) {
      console.error(err)
      alert('Failed to add pastor')
    } finally {
      setUploading(false)
    }
  }

  /* -------------------- DELETE -------------------- */
  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this pastor?')) return

    const { error } = await supabase.from('pasters').delete().eq('id', id)

    if (error) {
      alert('Delete failed')
      return
    }

    setPasters(prev => prev.filter(p => p.id !== id))
  }

  /* -------------------- EDIT -------------------- */
  const handleEdit = (p: paster) => {
    setEditingPaster(p)
    setEditOpen(true)
  }

  const handleUpdate = async (updated: paster) => {
    const {
  data: { user },
  error: authError
} = await supabase.auth.getUser()

console.log('AUTH USER:', user)

    const { data, error } = await supabase
      .from('pasters')
      .update({
        name: updated.name,
        description: updated.description,
        position: updated.position,
        image: updated.image
      })
      .eq('id', updated.id)
      .select()
      .single()

    if (error) {
      alert('Update failed')
      return
    }

    setPasters(prev =>
      prev.map(p => (p.id === updated.id ? data : p))
    )

    setEditOpen(false)
  }

  /* -------------------- RENDER -------------------- */
  return (
    <>
      <Card className="max-h-[70vh]">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Pastors</CardTitle>
          <Button size="sm" onClick={() => setIsOpen(true)} className="gap-1">
            <Plus size={16} />
            Add
          </Button>
        </CardHeader>

        <CardContent className="space-y-3 overflow-y-auto max-h-[60vh]">
          {pasters.map(p => (
            <div
              key={p.id}
              className="p-3 bg-gray-50 border rounded-lg"
            >
              <h3 className="font-semibold">{p.name}</h3>
              <p className="text-sm text-gray-600">{p.description}</p>

              <div className="flex gap-2 mt-3">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(p)}
                  className="flex-1 gap-1"
                >
                  <Edit2 size={14} />
                  Edit
                </Button>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(p.id)}
                  className="flex-1 text-red-600"
                >
                  <Trash2 size={14} />
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* -------------------- ADD MODAL -------------------- */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 space-y-4">
            <form onSubmit={handleSubmit} className="space-y-3">
              <h2 className="text-xl font-bold">Add Pastor</h2>

              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={e =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                className="w-full border p-2 rounded"
              />

              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={e =>
                  setFormData({
                    ...formData,
                    description: e.target.value
                  })
                }
                className="w-full border p-2 rounded"
              />

              <input
                type="text"
                placeholder="Position"
                value={formData.position}
                onChange={e =>
                  setFormData({
                    ...formData,
                    position: e.target.value
                  })
                }
                className="w-full border p-2 rounded"
              />

              <input
                type="file"
                accept="image/*"
                onChange={e =>
                  setImageFile(e.target.files?.[0] || null)
                }
                className="w-full border p-2 rounded"
              />

              <Button type="submit" disabled={uploading} className="w-full">
                {uploading ? 'Uploading...' : 'Add Pastor'}
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
                className="w-full"
              >
                Cancel
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* -------------------- EDIT MODAL -------------------- */}
      <EditpasterModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        paster={editingPaster}
        onUpdate={handleUpdate}
      />
    </>
  )
}
