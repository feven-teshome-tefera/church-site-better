'use client'

import type React from "react"
import { useState } from "react"
import emailjs from "@emailjs/browser"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        formData,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )
      .then(() => {
        setIsSubmitted(true)
        setTimeout(() => {
          setFormData({ name: "", email: "", phone: "", message: "" })
          setIsSubmitted(false)
        }, 2000)
      })
      .catch((err) => {
        console.error(err)
        alert("Failed to send message, please try again.")
      })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-semibold text-[#331660]">Full Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full rounded-xl border border-[#331660]/20 bg-white/80 px-4 py-2.5 outline-none transition focus:border-[#331660] focus:ring-2 focus:ring-[#331660]/15"
          placeholder="Your name"
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-semibold text-[#331660]">Email Address</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full rounded-xl border border-[#331660]/20 bg-white/80 px-4 py-2.5 outline-none transition focus:border-[#331660] focus:ring-2 focus:ring-[#331660]/15"
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-[#331660]">Phone Number (optional)</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full rounded-xl border border-[#331660]/20 bg-white/80 px-4 py-2.5 outline-none transition focus:border-[#331660] focus:ring-2 focus:ring-[#331660]/15"
          placeholder="(555) 123-4567"
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-semibold text-[#331660]">Message</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          className="w-full resize-none rounded-xl border border-[#331660]/20 bg-white/80 px-4 py-2.5 outline-none transition focus:border-[#331660] focus:ring-2 focus:ring-[#331660]/15"
          placeholder="Tell us how we can help..."
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-xl bg-[#331660] py-3 font-semibold text-white transition hover:bg-[#331660]"
      >
        {isSubmitted ? "Message Sent!" : "Send Message"}
      </button>
    </form>
  )
}
