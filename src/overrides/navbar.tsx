'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Search, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { siteContent } from '@/config/site.content'
import { cn } from '@/lib/utils'

export const NAVBAR_OVERRIDE_ENABLED = true

const navItems = [
  { label: 'Newsroom', href: '/updates' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export function NavbarOverride() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-[#16003b]/10 bg-white/90 shadow-[0_8px_30px_rgba(22,0,59,0.06)] backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:h-[4.25rem] sm:px-6 lg:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#16003b] text-sm font-bold text-white shadow-sm">P</span>
          <span className="min-w-0">
            <span className="block truncate text-lg font-semibold tracking-tight text-[#16003b]">{SITE_CONFIG.name}</span>
            <span className="hidden text-[10px] font-semibold uppercase tracking-[0.22em] text-[#7f8487] sm:block">
              {siteContent.navbar.tagline}
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'rounded-full px-3 py-2 text-sm font-semibold transition',
                  active ? 'bg-[#16003b]/8 text-[#16003b]' : 'text-[#413f42] hover:bg-[#16003b]/6 hover:text-[#16003b]',
                )}
              >
                {item.label}
              </Link>
            )
          })}
          <Link
            href="/search"
            className="ml-1 inline-flex items-center gap-2 rounded-full border border-[#16003b]/12 px-3 py-2 text-sm font-medium text-[#413f42] transition hover:border-[#f73d93]/40 hover:text-[#16003b]"
          >
            <Search className="h-4 w-4" aria-hidden />
            Search
          </Link>
        </div>

        <div className="hidden items-center gap-2 sm:flex">
          <Link href="/login" className="rounded-full px-4 py-2 text-sm font-semibold text-[#413f42] transition hover:bg-[#16003b]/6">
            Sign in
          </Link>
          <Link
            href="/register"
            className="rounded-full bg-[#f73d93] px-5 py-2 text-sm font-semibold text-white shadow-[0_10px_28px_rgba(247,61,147,0.35)] transition hover:bg-[#e02d82]"
          >
            Get started
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex rounded-full border border-[#16003b]/10 p-2 text-[#16003b] lg:hidden"
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open ? (
        <div className="border-t border-[#16003b]/10 bg-white px-4 py-4 lg:hidden">
          <div className="flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl px-3 py-3 text-sm font-semibold text-[#413f42] hover:bg-[#16003b]/6"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/search"
              className="flex items-center gap-2 rounded-xl px-3 py-3 text-sm font-semibold text-[#413f42] hover:bg-[#16003b]/6"
              onClick={() => setOpen(false)}
            >
              <Search className="h-4 w-4" />
              Search
            </Link>
            <Link
              href="/login"
              className="rounded-xl px-3 py-3 text-sm font-semibold text-[#413f42] hover:bg-[#16003b]/6"
              onClick={() => setOpen(false)}
            >
              Sign in
            </Link>
            <Link
              href="/register"
              className="mt-2 rounded-full bg-[#f73d93] py-3 text-center text-sm font-semibold text-white"
              onClick={() => setOpen(false)}
            >
              Get started
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  )
}
