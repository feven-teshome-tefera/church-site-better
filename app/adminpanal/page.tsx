'use client'
// import SermonModule from '@/components/sermons_module'


import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Edit2, Trash2, Plus } from 'lucide-react'
import { loadEvents, Event } from '@/lib/eventstore'
import { loadMinistries, ministries } from '@/lib/ministriesstore'
import { getSupabaseClient } from '@/lib/supabase-client'
import Mistry_module from '@/components/mistry_module'
import PasterModule from '@/components/pasters_module'
import { EditEventModal } from '@/components/Editeventmodal'
import { EditpasterModal } from '@/components/Editpastermodule'
import {useRouter} from "next/navigation"
export default function AdminPanel() {
  const supabase = getSupabaseClient()
  const [events, setEvents] = useState<Event[]>([])
  const [ministries, setMinistries] = useState<ministries[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const [editingEvent, setEditingEvent] = useState<Event | null>(null)
  const [editOpen, setEditOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    details: '',
    date: '',
    time: '',
    location: '',
    category: '',
  })

  useEffect(() => {
    loadEvents().then(setEvents)
    loadMinistries().then(setMinistries)
  }, [])

  // =========================
  // ADD EVENT
  // =========================
 const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const { data, error } = await supabase
      .from("events")
      .insert([formData])
      .select()
      .single() 
    if (error) {
      console.error(error.message)
      return
    }
      setEvents(prev => [data, ...prev])
    // reset + close
    setFormData({
      title: '',
      description: '',
      details: '',
      date: '',
      time: '',
      location: '',
      category: '',
    })
    setIsOpen(false)
    alert("event added successfully");
  }

  // =========================
  // EDIT EVENT
  // =========================
  const handleEdit = (event: Event) => {
    setEditingEvent(event)
    setEditOpen(true)
  }

  const handleUpdate = async (updatedEvent: Event) => {
    const { data, error } = await supabase
      .from('events')
      .update({
        title: updatedEvent.title,
        description: updatedEvent.description,
        details: updatedEvent.details,
        date: updatedEvent.date,
        time: updatedEvent.time,
        location: updatedEvent.location,
        category: updatedEvent.category,
      })
      .eq('id', updatedEvent.id)
      .select()
      .single()

    if (error) {
      alert('Update failed')
      return
    }

    setEvents(prev =>
      prev.map(e => (e.id === updatedEvent.id ? data : e))
    )

    setEditOpen(false)
  }

  // =========================
  // DELETE EVENT
  // =========================
  const handleDeleteEvent = async (id: number) => {
    if (!confirm('Delete this event?')) return

    const { error } = await supabase.from('events').delete().eq('id', id)

    if (error) {
      alert('Delete failed')
      return
    }

    setEvents(prev => prev.filter(e => e.id !== id))
  }
// const handleLogout = async () => {
//   if (!confirm('Are you sure you want to logout?')) return
//   const { error } = await supabase.auth.signOut()
//   if (error) return alert(error.message)
//   window.location.href = '/admin'
// }
const router = useRouter()  // ✅ inside component

const handleLogout = async () => {
  await supabase.auth.signOut()
  window.location.replace('/admin')
}

useEffect(() => {
  const checkSession = async () => {
    const { data } = await supabase.auth.getSession()
    if (!data.session) {
      router.push('/admin')
    }else{
    setLoading(false)
  }}
  checkSession()
}, [router])
if (loading) return null
  // =========================
  // FORM CHANGE
  // =========================
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (

    <div className="min-h-screen bg-background p-6 md:p-8">
      <div className="mx-auto max-w-7xl">
    <div className="flex justify-between items-center mb-8">
  <h1 className="text-4xl font-semibold text-[#331660]">Admin Panel</h1>
  <Button variant="destructive" onClick={handleLogout}>
    Log out
  </Button>
</div>
        {/* <h1 className="text-4xl font-bold mb-8">Admin Panel</h1> */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* EVENTS */}
          <Card className="max-h-[70vh] flex flex-col border-[#331660]/15 bg-white/80">
            <CardHeader className="flex flex-row justify-between">
              <CardTitle>Events</CardTitle>
              <Button size="sm" onClick={() => setIsOpen(true)}>
                <Plus size={16} /> Add
              </Button>
            </CardHeader>

            <CardContent className="overflow-y-auto space-y-3">
              {events.map(event => (
                <div key={event.id} className="rounded-xl border border-[#331660]/15 bg-white/80 p-3">
                  <h3 className="font-semibold">{event.title}</h3>
                  <p className="text-xs">{event.category}</p>
                  <p className="text-xs">{event.description}</p>
                  <p className="text-xs">{event.date}  {event.time}</p>

                  <div className="flex gap-2 mt-2">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(event)}>
                      <Edit2 size={14} /> Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-600"
                      onClick={() => handleDeleteEvent(event.id)}
                    >
                      <Trash2 size={14} /> Delete
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
          <PasterModule />
          <Mistry_module />
          {/* <SermonModule />  */}
        </div>
      </div>

      {/* ADD MODAL */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <form
            onSubmit={handleSubmit}
            className="w-96 space-y-3 rounded-2xl border border-[#331660]/20 bg-white p-6"
          >
            <h2 className="text-xl font-bold">Add Event</h2>

            <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" className="w-full border p-2" />
            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="w-full border p-2" />
            <textarea name="details" value={formData.details} onChange={handleChange} placeholder="Details" className="w-full border p-2" />
            {/* <label>Date</label> */}
            <input name="date" placeholder= "Enter the date here "value={formData.date} onChange={handleChange} className="w-full border p-2" />
            {/* <label>Time</label> */}
            <input type="text" name="time" placeholder= "Enter the time here " value={formData.time} onChange={handleChange} className="w-full border p-2" />
            <input name="location" value={formData.location} onChange={handleChange} placeholder="Location" className="w-full border p-2" />

            <select name="category" value={formData.category} onChange={handleChange} className="w-full border p-2">
              <option value="">Category</option>
              <option value="conference">Conference</option>
              <option value="service">Service</option>
              <option value="youth">Youth</option>
              <option value="worship">Worship</option>
              <option value="other">Other</option>
            </select>

            <Button type="submit" className="cursor-pointer w-full">Add</Button>
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)} className="w-full bg-gray-100 hover:bg-red-200 hover:text-black cursor-pointer">
              Cancel
            </Button>
          </form>
        </div>
      )}

      {/* EDIT MODAL */}
      <EditEventModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        event={editingEvent}
        onUpdate={handleUpdate}
      />

    </div>
  )
}
