import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Facebook, Linkedin, Twitter, Mail } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { ContentImage } from '@/components/shared/content-image'
import { fetchTaskPostBySlug, fetchTaskPosts } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG, getTaskConfig } from '@/lib/site-config'
import { formatRichHtml, RichContent } from '@/components/shared/rich-content'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import type { SitePost } from '@/lib/site-connector'

export const TASK_DETAIL_PAGE_OVERRIDE_ENABLED = true

const isValidImageUrl = (value?: string | null) =>
  typeof value === 'string' && (value.startsWith('/') || /^https?:\/\//i.test(value))

function getImageUrls(post: SitePost, content: Record<string, unknown>) {
  const media = Array.isArray(post.media) ? post.media : []
  const mediaImages = media.map((item) => item?.url).filter((url): url is string => isValidImageUrl(url))
  const contentImages = Array.isArray(content.images)
    ? (content.images as string[]).filter((url): url is string => isValidImageUrl(url))
    : []
  const merged = [...mediaImages, ...contentImages]
  if (merged.length) return merged
  if (isValidImageUrl(content.logo as string)) return [content.logo as string]
  return ['https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1400&q=80']
}

function absoluteUrl(value?: string | null) {
  if (!value) return null
  if (/^https?:\/\//i.test(value)) return value
  if (!value.startsWith('/')) return null
  return `${SITE_CONFIG.baseUrl.replace(/\/$/, '')}${value}`
}

export async function TaskDetailPageOverride({ task, slug }: { task: TaskKey; slug: string }) {
  const post = await fetchTaskPostBySlug('mediaDistribution', slug)
  if (!post) notFound()

  const taskConfig = getTaskConfig(task)
  const related = (await fetchTaskPosts('mediaDistribution', 10, { fresh: true }))
    .filter((item) => item.slug !== slug)
    .slice(0, 3)

  const content = (post.content || {}) as Record<string, unknown>
  const html = formatRichHtml(
    (content.body as string) || post.summary || '',
    'Full article content will appear here when available.',
  )
  const images = getImageUrls(post, content)
  const subtitle =
    (typeof content.excerpt === 'string' && content.excerpt.trim()) ||
    (post.summary || '').trim() ||
    ''

  const articleUrl = `${SITE_CONFIG.baseUrl.replace(/\/$/, '')}${taskConfig?.route || '/updates'}/${post.slug}`
  const encodedUrl = encodeURIComponent(articleUrl)
  const encodedTitle = encodeURIComponent(post.title)
  const shareLinks = [
    { label: 'Share on X', href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`, icon: Twitter },
    { label: 'Share on Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, icon: Facebook },
    { label: 'Share on LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`, icon: Linkedin },
    {
      label: 'Email',
      href: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
      icon: Mail,
    },
  ]

  const articleImage = absoluteUrl(images[0]) || absoluteUrl(SITE_CONFIG.defaultOgImage)
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: post.title,
    description: subtitle || post.summary,
    image: articleImage ? [articleImage] : [],
    author: { '@type': 'Person', name: post.authorName || 'Presslyy desk' },
    datePublished: post.publishedAt || undefined,
    dateModified: post.publishedAt || undefined,
    mainEntityOfPage: { '@type': 'WebPage', '@id': articleUrl },
  }
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_CONFIG.baseUrl.replace(/\/$/, '') },
      {
        '@type': 'ListItem',
        position: 2,
        name: taskConfig?.label || 'Newsroom',
        item: `${SITE_CONFIG.baseUrl.replace(/\/$/, '')}${taskConfig?.route || '/updates'}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: articleUrl,
      },
    ],
  }

  const published = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : ''

  return (
    <div className="min-h-screen bg-[#f6f4f8] text-[#413f42]">
      <NavbarShell />
      <SchemaJsonLd data={[articleSchema, breadcrumbSchema]} />

      <article>
        <header className="border-b border-[#16003b]/8 bg-white">
          <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:py-14 lg:px-8">
            <nav aria-label="Breadcrumb" className="text-sm text-[#7f8487]">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link href="/" className="hover:text-[#f73d93]">
                    Home
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li>
                  <Link href={taskConfig?.route || '/updates'} className="hover:text-[#f73d93]">
                    {taskConfig?.label || 'Newsroom'}
                  </Link>
                </li>
              </ol>
            </nav>
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.24em] text-[#f73d93]">
              {typeof content.category === 'string' && content.category.trim() ? content.category : 'Press wire'}
            </p>
            <h1 className="mt-3 text-3xl font-semibold leading-[1.12] tracking-[-0.03em] text-[#16003b] sm:text-4xl lg:text-[2.5rem]">
              {post.title}
            </h1>
            {subtitle ? <p className="mt-5 text-lg leading-relaxed text-[#7f8487]">{subtitle}</p> : null}
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[#413f42]">
              <span className="font-semibold text-[#16003b]">{post.authorName || 'Presslyy editorial'}</span>
            </div>
          </div>
        </header>

        <div className="relative aspect-[21/9] w-full overflow-hidden border-b border-[#16003b]/8 bg-[#16003b] sm:aspect-[2.4/1]">
          <ContentImage src={images[0]} alt={post.title} fill className="object-cover" priority />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#16003b]/55 to-transparent" aria-hidden />
        </div>

        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:py-14 lg:px-8">
          <div className="flex flex-wrap items-center gap-2 border-b border-[#16003b]/10 pb-8">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7f8487]">Share</span>
            <div className="flex flex-wrap gap-2">
              {shareLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#16003b]/12 bg-white text-[#16003b] shadow-sm transition hover:border-[#f73d93]/40 hover:text-[#f73d93]"
                  aria-label={item.label}
                >
                  <item.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <RichContent
            html={html}
            className="article-content mt-10 max-w-none text-base leading-[1.85] text-[#413f42] prose-headings:text-[#16003b]"
          />
        </div>
      </article>

      {related.length ? (
        <section className="border-t border-[#16003b]/8 bg-white py-14 lg:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-semibold tracking-[-0.02em] text-[#16003b] sm:text-2xl">Related releases</h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {related.map((item) => {
                const ic = (item.content || {}) as Record<string, unknown>
                const imgs = getImageUrls(item, ic)
                return (
                  <Link
                    key={item.id}
                    href={`/updates/${item.slug}`}
                    className="group overflow-hidden rounded-2xl border border-[#16003b]/10 bg-[#f6f4f8] shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <ContentImage src={imgs[0]} alt={item.title} fill className="object-cover transition duration-500 group-hover:scale-105" />
                    </div>
                    <div className="p-5">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#f73d93]">
                        {typeof ic.category === 'string' ? ic.category : 'Release'}
                      </p>
                      <p className="mt-2 line-clamp-2 text-lg font-semibold leading-snug text-[#16003b]">{item.title}</p>
                      <p className="mt-3 line-clamp-2 text-sm text-[#7f8487]">{item.summary}</p>
                      <span className="mt-4 inline-flex text-sm font-semibold text-[#16003b] group-hover:underline">Read more</span>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      ) : null}

      <Footer />
    </div>
  )
}
