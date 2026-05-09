import Link from 'next/link'
import { Calendar, Check, Star } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { fetchTaskPosts } from '@/lib/task-data'
import { SITE_CONFIG } from '@/lib/site-config'
import { siteContent } from '@/config/site.content'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { PresslyyHeroCarousel } from '@/components/presslyy/hero-carousel'
import type { SitePost } from '@/lib/site-connector'

export const HOME_PAGE_OVERRIDE_ENABLED = true

function getPostImage(post?: SitePost | null) {
  const media = Array.isArray(post?.media) ? post?.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const contentImage =
    typeof post?.content === 'object' && post?.content && Array.isArray((post.content as { images?: string[] }).images)
      ? (post.content as { images: string[] }).images.find((url) => typeof url === 'string' && url)
      : null
  const logo =
    typeof post?.content === 'object' && post?.content && typeof (post.content as { logo?: string }).logo === 'string'
      ? (post.content as { logo: string }).logo
      : null
  return mediaUrl || contentImage || logo || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&q=80'
}

function getCategory(post: SitePost) {
  const c = post.content && typeof post.content === 'object' ? (post.content as { category?: string }).category : null
  if (typeof c === 'string' && c.trim()) return c.trim()
  const tag = post.tags?.find((t) => typeof t === 'string')
  return typeof tag === 'string' ? tag : 'Press wire'
}

const faqItems = [
  {
    q: 'How quickly do releases appear in the newsroom?',
    a: 'Newly published items follow your normal site cache settings. Most updates appear within a few minutes.',
  },
  {
    q: 'Can we organize releases by topic?',
    a: 'Yes—use categories on each release so visitors can filter the archive without losing context.',
  },
  {
    q: 'Do article pages support sharing?',
    a: 'Each release page includes sharing actions so readers can distribute the story to common networks.',
  },
]

export async function HomePageOverride() {
  const posts = await fetchTaskPosts('mediaDistribution', 12, { fresh: true })
  const heroSlides = posts.slice(0, 5).map((post) => ({
    id: post.id,
    title: post.title,
    href: `/updates/${post.slug}`,
    image: getPostImage(post),
  }))
  const latestThree = posts.slice(0, 3)

  const schemaData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.baseUrl,
      logo: `${SITE_CONFIG.baseUrl.replace(/\/$/, '')}${SITE_CONFIG.defaultOgImage}`,
      sameAs: [],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.baseUrl,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE_CONFIG.baseUrl.replace(/\/$/, '')}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
  ]

  return (
    <div className="min-h-screen bg-[#f6f4f8] text-[#413f42]">
      <NavbarShell />
      <SchemaJsonLd data={schemaData} />

      <section className="relative overflow-hidden bg-[#16003b] text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(247,61,147,0.35), transparent 42%), radial-gradient(circle at 80% 0%, rgba(255,255,255,0.12), transparent 35%)',
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12 lg:py-20">
          <div className="presslyy-animate-rise max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#f73d93]">From the newsroom</p>
            <h1 className="mt-4 text-4xl font-semibold leading-[1.08] tracking-[-0.04em] sm:text-5xl lg:text-[3.15rem]">
              Distribute press wire with a newsroom that feels premium—not generic.
            </h1>
            <p className="mt-6 text-base leading-relaxed text-white/85">{SITE_CONFIG.description}</p>
            <div className="mt-6 flex items-center gap-2 text-sm text-white/90">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-[#f73d93] text-[#f73d93]" aria-hidden />
                ))}
              </div>
              <span className="text-white/75">Trusted by teams who need clean distribution</span>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/updates"
                className="inline-flex items-center justify-center rounded-full bg-[#f73d93] px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_40px_rgba(247,61,147,0.45)] transition hover:bg-[#e02d82]"
              >
                {siteContent.hero.primaryCta.label}
              </Link>
            </div>
          </div>
          <div className="mt-12 lg:mt-0">
            <PresslyyHeroCarousel slides={heroSlides} />
          </div>
        </div>
        <svg className="presslyy-wave -mb-px w-full text-[#f6f4f8]" viewBox="0 0 1440 48" preserveAspectRatio="none" aria-hidden>
          <path fill="currentColor" d="M0,24 C180,0 360,48 540,24 C720,0 900,48 1080,24 C1260,0 1440,24 1440,24 L1440,48 L0,48 Z" />
        </svg>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#7f8487]">Built for modern PR</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-[#16003b] sm:text-4xl">An extension of your communications team</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#7f8487]">
            Whether you are a lean startup or a busy agency desk, Presslyy keeps publishing disciplined and the public surface polished.
          </p>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <Link
            href="/contact"
            className="group relative overflow-hidden rounded-2xl border border-[#16003b]/10 shadow-[0_20px_60px_rgba(22,0,59,0.08)] transition hover:-translate-y-0.5"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition duration-700 group-hover:scale-105"
              style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&q=80)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#16003b]/95 via-[#16003b]/55 to-[#16003b]/25" />
            <div className="relative flex min-h-[280px] flex-col justify-end p-8 text-white">
              <h3 className="text-2xl font-semibold">Agencies & partners</h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-white/85">
                Give every client a premium archive experience without rebuilding the wheel for each launch.
              </p>
              <span className="mt-6 inline-flex w-fit rounded-full border border-white/35 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide backdrop-blur">
                Talk to us
              </span>
            </div>
          </Link>
        </div>
      </section>

      <section className="border-y border-[#16003b]/8 bg-white py-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.05fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#f73d93]">Why Presslyy</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-[#16003b] sm:text-4xl">Distribution that stays readable end-to-end</h2>
            <ul className="mt-8 space-y-4">
              {[
                'Structured headlines and summaries for fast scanning',
                'Newsroom grid with category + date-friendly filters',
                'Article pages with sharing tools and related reading',
              ].map((line) => (
                <li key={line} className="flex gap-3 text-sm leading-relaxed text-[#413f42]">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#16003b] text-white">
                    <Check className="h-3.5 w-3.5" aria-hidden />
                  </span>
                  {line}
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/updates"
                className="inline-flex rounded-full border border-[#16003b]/15 bg-[#16003b] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#2a0a5c]"
              >
                Explore the newsroom
              </Link>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-2xl border border-[#16003b]/10 bg-[#16003b] shadow-[0_28px_80px_rgba(22,0,59,0.2)]">
            <div
              className="absolute inset-0 opacity-90"
              style={{
                backgroundImage: 'url(https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1200&q=80)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#16003b]/95 via-[#16003b]/55 to-[#f73d93]/35" />
            <div className="relative aspect-video w-full p-8 sm:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/75">Studio walkthrough</p>
              <p className="mt-4 max-w-md text-lg font-semibold leading-snug text-white">
                See how a release moves from draft to a public article page—without losing structure.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-white/85">
                This preview uses your live styling so stakeholders see the real experience—not a slide deck mock.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#7f8487]">Coverage lanes</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-[#16003b]">Industry-ready presentation</h2>
          </div>
          <Link href="/updates" className="text-sm font-semibold text-[#f73d93] hover:underline">
            Browse all categories →
          </Link>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: 'Technology & AI',
              img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
            },
            {
              title: 'Finance & Markets',
              img: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80',
            },
            {
              title: 'Health & Science',
              img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
            },
            {
              title: 'Lifestyle & Culture',
              img: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="group overflow-hidden rounded-2xl border border-[#16003b]/10 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div
                className="h-36 bg-cover bg-center transition duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url(${item.img})` }}
              />
              <div className="border-t border-[#16003b]/8 bg-[#16003b] px-4 py-4">
                <p className="text-sm font-semibold text-white">{item.title}</p>
                <Link href="/updates" className="mt-2 inline-block text-xs font-semibold text-[#f73d93] hover:underline">
                  View newsroom
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#ede9f2]/80 py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#16003b] text-white shadow-lg">
            <Calendar className="h-7 w-7" aria-hidden />
          </div>
          <h2 className="mt-6 text-2xl font-semibold tracking-[-0.03em] text-[#16003b] sm:text-3xl">Talk with our distribution desk</h2>
          <p className="mt-4 text-sm leading-relaxed text-[#7f8487]">
            Need a walkthrough of plans, newsroom setup, or how to prepare assets for launch day? Send a note—we respond on business days.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex rounded-full bg-[#f73d93] px-8 py-3 text-sm font-semibold text-white shadow-[0_12px_32px_rgba(247,61,147,0.35)] transition hover:bg-[#e02d82]"
          >
            Contact Presslyy
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#7f8487]">Latest from the newsroom</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-[#16003b]">Recent press wire</h2>
          </div>
          <Link href="/updates" className="text-sm font-semibold text-[#f73d93] hover:underline">
            View all →
          </Link>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {latestThree.length ? (
            latestThree.map((post) => (
              <Link
                key={post.id}
                href={`/updates/${post.slug}`}
                className="group overflow-hidden rounded-2xl border border-[#16003b]/10 bg-white shadow-[0_16px_48px_rgba(22,0,59,0.06)] transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div
                  className="h-44 bg-cover bg-center transition duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url(${getPostImage(post)})` }}
                />
                <div className="p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#f73d93]">{getCategory(post)}</p>
                  <h3 className="mt-2 line-clamp-2 text-lg font-semibold leading-snug text-[#16003b]">{post.title}</h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-[#7f8487]">{post.summary}</p>
                  <span className="mt-4 inline-flex text-sm font-semibold text-[#16003b] group-hover:underline">Read more →</span>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full rounded-2xl border border-dashed border-[#16003b]/20 bg-white p-10 text-center text-sm text-[#7f8487]">
              Published releases will appear here. Open the newsroom to browse the full archive.
            </div>
          )}
        </div>
      </section>

      <section className="border-t border-[#16003b]/8 bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-center text-2xl font-semibold tracking-[-0.03em] text-[#16003b] sm:text-3xl">Questions, answered</h2>
          <div className="mt-10 space-y-3">
            {faqItems.map((item) => (
              <details
                key={item.q}
                className="group rounded-2xl border border-[#16003b]/10 bg-[#f6f4f8]/60 px-5 py-4 transition open:bg-white open:shadow-sm"
              >
                <summary className="cursor-pointer list-none text-left text-sm font-semibold text-[#16003b] [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center justify-between gap-4">
                    {item.q}
                    <span className="text-[#f73d93] transition group-open:rotate-45">+</span>
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-[#7f8487]">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
        <h2 className="text-center text-2xl font-semibold tracking-[-0.03em] text-[#16003b] sm:text-3xl">What communicators say</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            {
              name: 'Jordan M.',
              role: 'Communications lead',
              quote:
                'The newsroom finally looks like our brand—not a bolted-on blog. Approvals are faster because the page structure is obvious.',
            },
            {
              name: 'Sarah M.',
              role: 'PR agency director',
              quote:
                'Clients understand the archive immediately. We spend less time explaining navigation and more time on the story.',
            },
            {
              name: 'Alex R.',
              role: 'Founder',
              quote:
                'We needed a credible public surface for launch week. Presslyy made the release feel serious without enterprise bloat.',
            },
          ].map((t) => (
            <figure
              key={t.name}
              className="rounded-2xl border border-[#16003b]/10 bg-white p-6 shadow-[0_12px_40px_rgba(22,0,59,0.05)]"
            >
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-[#f73d93] text-[#f73d93]" aria-hidden />
                ))}
              </div>
              <blockquote className="mt-4 text-sm leading-relaxed text-[#413f42]">&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption className="mt-5 text-sm font-semibold text-[#16003b]">
                {t.name}
                <span className="mt-1 block text-xs font-normal text-[#7f8487]">{t.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}
