export const siteIdentity = {
  code: process.env.NEXT_PUBLIC_SITE_CODE || 'hz87rej5pm',
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'Presslyy',
  tagline: process.env.NEXT_PUBLIC_SITE_TAGLINE || 'Press wire distribution that reaches journalists and search',
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    'Presslyy helps teams publish polished press wire, reach media outlets, and keep a public newsroom that stays easy to scan.',
  domain: process.env.NEXT_PUBLIC_SITE_DOMAIN || 'presslyy.com',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://presslyy.com',
  ogImage: process.env.NEXT_PUBLIC_SITE_OG_IMAGE || '/og-default.png',
  googleMapsEmbedApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY || '',
} as const

export const defaultAuthorProfile = {
  name: siteIdentity.name,
  avatar: '/placeholder.svg?height=80&width=80',
} as const
