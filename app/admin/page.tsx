'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getSupabaseClient } from '@/lib/supabase-client'

export default function AdminLoginPage() {
  const supabase = getSupabaseClient()
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser()
      if (data.user) router.push('/adminpanal')
    }

    checkUser()
  }, [router, supabase])

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { data, error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    const { data: profile } = await supabase.from('profiles').select('role').eq('id', data.user.id).single()

    if (profile?.role === 'admin') {
      router.push('/adminpanal')
    } else {
      router.push('/')
    }

    setLoading(false)
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f8f4ef] px-4">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_5%,rgba(122,74,45,0.2),transparent_30%),radial-gradient(circle_at_90%_90%,rgba(176,125,82,0.22),transparent_34%)]" />
      <div className="relative w-full max-w-md rounded-3xl border border-[#331660]/12 bg-white/80 p-8 shadow-xl backdrop-blur">
        <h1 className="text-center text-4xl font-semibold text-[#331660]">Admin Sign In</h1>
        <p className="mt-2 text-center text-sm text-foreground/70">Secure access to church content management.</p>

        <form onSubmit={handleSignIn} className="mt-8 space-y-4">
          {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-xl border border-[#331660]/20 bg-white px-4 py-2.5 outline-none focus:border-[#331660]"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded-xl border border-[#331660]/20 bg-white px-4 py-2.5 outline-none focus:border-[#331660]"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#331660] py-2.5 font-semibold text-white transition hover:bg-[#331660]"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}
