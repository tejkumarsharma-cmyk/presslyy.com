import Link from 'next/link'
import { Facebook, Linkedin, Twitter, Youtube } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { siteContent } from '@/config/site.content'

export const FOOTER_OVERRIDE_ENABLED = true

const columns = [
  {
    title: 'Product',
    links: [
      { label: 'Newsroom', href: '/updates' },
      { label: 'Search', href: '/search' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Press', href: '/press' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Blog', href: '/blog' },
      { label: 'Status', href: '/status' },
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
    ],
  },
]

const social = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com', icon: Linkedin },
  { label: 'X', href: 'https://twitter.com', icon: Twitter },
  { label: 'Facebook', href: 'https://www.facebook.com', icon: Facebook },
  { label: 'YouTube', href: 'https://www.youtube.com', icon: Youtube },
]

export function FooterOverride() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-[#16003b]/10 bg-[#ede9f2]/90">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#16003b] text-sm font-bold text-white">P</span>
              <div>
                <p className="text-lg font-semibold text-[#16003b]">{SITE_CONFIG.name}</p>
                <p className="text-xs text-[#7f8487]">{siteContent.footer.tagline}</p>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-[#7f8487]">{SITE_CONFIG.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {social.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#16003b]/10 bg-white text-[#16003b] transition hover:border-[#f73d93]/40 hover:text-[#f73d93]"
                  aria-label={item.label}
                >
                  <item.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#16003b]">{col.title}</p>
                <ul className="mt-4 space-y-3 text-sm">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-[#413f42] transition hover:text-[#f73d93]">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-[#16003b]/10 pt-8 text-sm text-[#7f8487] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/cookies" className="hover:text-[#16003b]">
              Cookies
            </Link>
            <Link href="/licenses" className="hover:text-[#16003b]">
              Licenses
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
