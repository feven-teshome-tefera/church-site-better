'use client'

import { getSupabaseClient } from "@/lib/supabase-client"
import { useState,useEffect } from "react"
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Edit2, Trash2, Plus } from 'lucide-react';

import { loadMinistries, ministries } from '@/lib/ministriesstore';
import { toast } from "@/components/ui/use-toast";
import { EditminstryModal } from "./EditminstryModal";
// /home/feven/Downloads/church-website-build(2)/components/ui/toast.tsx
export default function MinistryModule() {
  const supabase = getSupabaseClient()
const [ministries, setMinistries] = useState<ministries[]>([]);
  const [isOpen, setIsOpen] = useState(false)
    const [editingMinistry, setEditingMinistry] = useState<ministries | null>(null)
    const [editOpen, setEditOpen] = useState(false)
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    details: "",
  })
  const handleDeleteMinistry = async (ministryId: number) => {
        const confirmed = confirm("Are you sure you want to delete this event?");

  if (!confirmed) return;
  const { error } = await supabase
    .from("ministries")
    .delete()
    .eq("id", ministryId);

  if (error) {
    console.error("Delete failed:", error.message);
    return;
  }
// alert("Ministry deleted successfully");


  // Update UI (remove deleted event)
  setMinistries(prev => prev.filter(ministry => ministry.id !== ministryId));
};
  const handleEdit = (ministry: ministries) => {
      setEditingMinistry(ministry)
      setEditOpen(true)
    }
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
 const handleUpdate = async (updatedpaster: ministries) => {
    const { data, error } = await supabase
      .from('ministries')
      .update({
        title: updatedpaster.title,
        description: updatedpaster.description,
        details: updatedpaster.details,
      })
      .eq('id', updatedpaster.id)
      .select()
      .single()

    if (error) {
      alert('Update failed')
      return
    }

    setMinistries(prev =>
      prev.map(e => (e.id === updatedpaster.id ? data : e))
    )

    setEditOpen(false)
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const { data, error } = await supabase
      .from("ministries")
      .insert([formData])
      .select()
      .single() // <-- important, returns the inserted row

    if (error) {
      console.error(error.message)
      return
    }
      setMinistries(prev => [...prev, data])
    // reset + close
    setFormData({ title: "", description: "", details: "" })
    setIsOpen(false)
    alert("Ministry added successfully");
  }
      useEffect(() => {
        loadMinistries().then(setMinistries);
      }, []);
    return(
        <>
        <div>
          
            {/* Ministries Card */}
            <Card className="flex flex-col max-h-[70vh] mb-7">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle>Ministries</CardTitle>
              <Button size="sm" 
              onClick={() => setIsOpen(true)} 
              className="gap-1">
                <Plus size={16} />
                Add
              </Button>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto pr-4 space-y-3 max-h-[70vh]">
              {ministries.map((ministry) => (
                <div key={ministry.id} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <h3 className="font-semibold text-sm text-gray-900">{ministry.title}</h3>
                  <p className="text-xs text-gray-600 mt-1">{ministry.description}</p>
                  <div className="flex gap-2 mt-3">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(ministry)}
                      className="flex-1 gap-1"
                    >
                      <Edit2 size={14} />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteMinistry(ministry.id)}
                      className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 size={14} />
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
            {isOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                                <div className="bg-white p-6 rounded-lg w-96 relative max-h-[90vh] overflow-y-auto">

                       <form
      onSubmit={handleSubmit}
      className=" mx-auto bg-white p-6 rounded-xl shadow space-y-4"
    >
      <h2 className="text-2xl font-bold">Add New Ministry</h2>

      {/* Title */}
      <input
        type="text"
        name="title"
        placeholder="Ministry Title"
        value={formData.title}
        onChange={handleChange}
        required
        className="w-full border p-2 rounded"
      />

      {/* Short Description */}
      <textarea
        name="description"
        placeholder="Short Description"
        value={formData.description}
        onChange={handleChange}
        rows={2}
        className="w-full border p-2 rounded"
      />

      {/* Details */}
      <textarea
        name="details"
        placeholder="Ministry Details"
        value={formData.details}
        onChange={handleChange}
        rows={4}
        className="w-full border p-2 rounded"
      />

  
      {/* Submit */}
      
    
<Button type="submit" className="cursor-pointer w-full">Add</Button>
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)} className="w-full bg-gray-100 hover:bg-red-200 hover:text-black cursor-pointer">
              Cancel
            </Button>
    </form>
                </div>
                </div>
            )}
            
        </div>
          <EditminstryModal
                open={editOpen}
                onClose={() => setEditOpen(false)}
                minstry={editingMinistry}
                onUpdate={handleUpdate}
              />
        </>
    )
}