import Link from 'next/link'
import { Filter, Search } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { fetchTaskPosts } from '@/lib/task-data'
import { SITE_CONFIG, getTaskConfig, type TaskKey } from '@/lib/site-config'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'
import { taskIntroCopy } from '@/config/site.content'
import { TaskListClient } from '@/components/tasks/task-list-client'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'

export const TASK_LIST_PAGE_OVERRIDE_ENABLED = true

export async function TaskListPageOverride({
  task,
  category,
  publishedAfter,
}: {
  task: TaskKey
  category?: string
  publishedAfter?: string
}) {
  const taskConfig = getTaskConfig(task)
  const posts = await fetchTaskPosts(task, 36, { fresh: true })
  const normalizedCategory = category ? normalizeCategory(category) : 'all'
  const intro = taskIntroCopy[task]
  const baseUrl = SITE_CONFIG.baseUrl.replace(/\/$/, '')
  const listPath = taskConfig?.route || '/updates'
  const schemaItems = posts.slice(0, 12).map((post, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    url: `${baseUrl}${listPath}/${post.slug}`,
    name: post.title,
  }))

  return (
    <div className="min-h-screen bg-[#f6f4f8] text-[#413f42]">
      <NavbarShell />
      <SchemaJsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: `${taskConfig?.label || 'Newsroom'} | ${SITE_CONFIG.name}`,
          url: `${baseUrl}${listPath}`,
          hasPart: schemaItems,
        }}
      />

      <section className="border-b border-[#16003b]/8 bg-[#16003b] text-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#f73d93]">From the newsroom</p>
          <h1 className="mt-3 max-w-3xl text-3xl font-semibold tracking-[-0.03em] sm:text-4xl lg:text-[2.35rem]">
            Latest press wire
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/85">
            Browse announcements with category filters, optional date refinements, and site search for fast discovery.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        {intro ? (
          <section className="mb-10 rounded-2xl border border-[#16003b]/10 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-xl font-semibold text-[#16003b]">{intro.title}</h2>
            {intro.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 48)} className="mt-4 text-sm leading-relaxed text-[#7f8487]">
                {paragraph}
              </p>
            ))}
            <div className="mt-4 flex flex-wrap gap-4 text-sm font-semibold">
              {intro.links.map((link) => (
                <Link key={link.href} href={link.href} className="text-[#f73d93] hover:underline">
                  {link.label}
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        <div className="mb-10 flex flex-col gap-4 rounded-2xl border border-[#16003b]/10 bg-white p-4 shadow-sm sm:flex-row sm:items-end sm:justify-between sm:p-6">
          <form className="grid w-full gap-4 sm:grid-cols-[1fr_1fr_auto]" action={listPath} method="get">
            <div>
              <label htmlFor="newsroom-category" className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#7f8487]">
                <Filter className="h-3.5 w-3.5" aria-hidden />
                Category
              </label>
              <select
                id="newsroom-category"
                name="category"
                defaultValue={normalizedCategory === 'all' ? 'all' : normalizedCategory}
                className="mt-2 h-11 w-full rounded-xl border border-[#16003b]/12 bg-[#f6f4f8] px-3 text-sm text-[#413f42] outline-none ring-[#f73d93]/30 focus:ring-2"
              >
                <option value="all">All categories</option>
                {CATEGORY_OPTIONS.map((item) => (
                  <option key={item.slug} value={item.slug}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="newsroom-from" className="text-xs font-semibold uppercase tracking-[0.16em] text-[#7f8487]">
                Published on or after
              </label>
              <input
                id="newsroom-from"
                type="date"
                name="from"
                defaultValue={publishedAfter || ''}
                className="mt-2 h-11 w-full rounded-xl border border-[#16003b]/12 bg-[#f6f4f8] px-3 text-sm text-[#413f42] outline-none ring-[#f73d93]/30 focus:ring-2"
              />
            </div>
            <div className="flex items-end gap-2">
              <button
                type="submit"
                className="h-11 w-full rounded-xl bg-[#16003b] px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-[#2a0a5c] sm:w-auto"
              >
                Apply
              </button>
            </div>
          </form>

          <form action="/search" method="get" className="flex w-full max-w-md items-center gap-2 sm:w-auto">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7f8487]" aria-hidden />
              <input
                name="q"
                placeholder="Search releases…"
                className="h-11 w-full rounded-xl border border-[#16003b]/12 bg-[#f6f4f8] py-2 pl-10 pr-3 text-sm text-[#413f42] outline-none ring-[#f73d93]/30 focus:ring-2"
              />
            </div>
            <button type="submit" className="h-11 shrink-0 rounded-xl bg-[#f73d93] px-4 text-sm font-semibold text-white hover:bg-[#e02d82]">
              Go
            </button>
          </form>
        </div>

        <TaskListClient
          task={task}
          initialPosts={posts}
          category={normalizedCategory}
          publishedAfter={publishedAfter}
          listClassName="lg:grid-cols-3"
        />
      </main>
      <Footer />
    </div>
  )
}
