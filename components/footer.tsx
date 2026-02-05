import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-[#331660]/10 bg-[#331660] text-[#f8f4ef]">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div>
            <h3 className="font-heading text-2xl">Emmanuel Baptist</h3>
            <p className="mt-3 text-sm text-[#f8f4ef]/80">A church family growing in Christ and serving our city with love.</p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#f8f4ef]/70">Explore</h4>
            <div className="mt-4 space-y-2 text-sm">
              <Link href="/" className="block hover:text-white">Home</Link>
              <Link href="/about" className="block hover:text-white">About</Link>
              <Link href="/ministries" className="block hover:text-white">Ministries</Link>
              <Link href="/events" className="block hover:text-white">Events</Link>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#f8f4ef]/70">Connect</h4>
            <div className="mt-4 space-y-2 text-sm">
              <Link href="/sermons" className="block hover:text-white">Sermons</Link>
              <Link href="/contact" className="block hover:text-white">Contact</Link>
              <p className="pt-1 text-[#f8f4ef]/70">2Q9F+52V, Addis Ababa</p>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#f8f4ef]/70">Service Times</h4>
            <div className="mt-4 space-y-2 text-sm text-[#f8f4ef]/85">
              <p>Sunday: 10:00 AM & 5:30 PM</p>
              <p>Wednesday: 6:30 PM</p>
              <p>Friday: 7:00 PM</p>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-[#f8f4ef]/65">
          <p>&copy; {new Date().getFullYear()} Emmanuel Baptist Church. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
