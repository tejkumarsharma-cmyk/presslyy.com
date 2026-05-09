import type { TaskKey } from '@/lib/site-config'

export const siteContent = {
  navbar: {
    tagline: 'Media distribution desk',
  },
  footer: {
    tagline: 'Press wire built for discovery and credibility',
  },
  hero: {
    badge: 'Press distribution',
    title: ['Reach journalists, feeds, and readers with a newsroom built for clarity.'],
    description:
      'Presslyy is a media press wire workspace: publish once, distribute with structure, and keep a public archive that looks like a modern news desk.',
    primaryCta: {
      label: 'Browse newsroom',
      href: '/updates',
    },
    searchPlaceholder: 'Search releases',
    focusLabel: 'Latest',
    featureCardBadge: 'Spotlight',
    featureCardTitle: 'Your announcement stays readable in every channel.',
    featureCardDescription:
      'Headlines, summaries, and article pages are tuned for scanning—so busy editors and readers get the point fast.',
  },
  home: {
    metadata: {
      title: 'Presslyy — Press wire distribution and newsroom',
      description:
        'Publish press wire, grow visibility, and keep a credible public newsroom with Presslyy.',
      openGraphTitle: 'Presslyy — Press wire distribution',
      openGraphDescription:
        'Modern press wire distribution with a clean newsroom and readable article pages.',
      keywords: [
        'press wire',
        'media distribution',
        'newsroom',
        'PR distribution',
        'announcements',
        'Presslyy',
      ],
    },
    introBadge: 'Why teams choose Presslyy',
    introTitle: 'A publishing surface that matches how media actually works.',
    introParagraphs: [
      'Editors skim. Search indexes structure. Your page should make the story obvious in seconds—not buried in decorative chrome.',
      'Presslyy keeps the newsroom legible, the article typography calm, and the path from headline to detail frictionless.',
    ],
    sideBadge: 'What you get',
    sidePoints: [
      'A public newsroom grid with filters and search.',
      'Article pages tuned for reading and sharing.',
    ],
    primaryLink: {
      label: 'Open newsroom',
      href: '/updates',
    },
    secondaryLink: {
      label: 'Talk to us',
      href: '/contact',
    },
  },
  cta: {
    badge: 'Distribution support',
    title: 'Need help choosing a plan or preparing a release?',
    description:
      'Tell us your timeline, audience, and assets—we will point you to the right workflow and distribution level.',
    primaryCta: {
      label: 'Contact',
      href: '/contact',
    },
    secondaryCta: {
      label: 'Read the newsroom',
      href: '/updates',
    },
  },
  taskSectionHeading: 'Latest releases',
  taskSectionDescriptionSuffix: 'Fresh announcements from the Presslyy newsroom.',
} as const

export const taskPageMetadata: Record<
  Exclude<TaskKey, 'comment' | 'org' | 'social'>,
  { title: string; description: string }
> = {
  article: {
    title: 'Articles',
    description: 'Read the latest posts and long-form updates.',
  },
  listing: {
    title: 'Listings',
    description: 'Explore listings and directory-style entries.',
  },
  classified: {
    title: 'Classifieds',
    description: 'Browse classifieds and short-form notices.',
  },
  image: {
    title: 'Images',
    description: 'Browse image-led updates and visual posts.',
  },
  profile: {
    title: 'Profiles',
    description: 'View profile pages and public identities.',
  },
  sbm: {
    title: 'Bookmarks',
    description: 'Browse curated resources and saved links.',
  },
  pdf: {
    title: 'Resources',
    description: 'Open PDFs and downloadable files.',
  },
  mediaDistribution: {
    title: 'Latest press wire',
    description: 'Browse the newsroom archive with filters and search.',
  },
}

export const taskIntroCopy: Record<
  TaskKey,
  { title: string; paragraphs: string[]; links: { label: string; href: string }[] }
> = {
  listing: {
    title: 'Listings',
    paragraphs: ['Directory entries and service pages.'],
    links: [{ label: 'Home', href: '/' }],
  },
  article: { title: 'Articles', paragraphs: ['General long-form article feed.'], links: [{ label: 'Home', href: '/' }] },
  classified: { title: 'Classifieds', paragraphs: ['Short-form posts and notices.'], links: [{ label: 'Home', href: '/' }] },
  image: { title: 'Images', paragraphs: ['Image-first posts and galleries.'], links: [{ label: 'Home', href: '/' }] },
  profile: { title: 'Profiles', paragraphs: ['Profile pages and identity surfaces.'], links: [{ label: 'Home', href: '/' }] },
  sbm: { title: 'Bookmarks', paragraphs: ['Curated saved links and references.'], links: [{ label: 'Home', href: '/' }] },
  pdf: { title: 'Resources', paragraphs: ['Downloadable files and documents.'], links: [{ label: 'Home', href: '/' }] },
  social: { title: 'Social', paragraphs: ['Short updates and activity.'], links: [{ label: 'Home', href: '/' }] },
  comment: { title: 'Comments', paragraphs: ['Commentary and response posts.'], links: [{ label: 'Home', href: '/' }] },
  org: { title: 'Organizations', paragraphs: ['Organization pages and entities.'], links: [{ label: 'Home', href: '/' }] },
  mediaDistribution: {
    title: 'Newsroom archive',
    paragraphs: [
      'Browse published press wire with category filters, date refinements, and site search to jump straight to the story you need.',
      'Each release opens into a full article view with sharing tools and related reading to keep context close.',
    ],
    links: [
      { label: 'Home', href: '/' },
    ],
  },
}
