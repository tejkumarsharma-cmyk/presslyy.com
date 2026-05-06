export const siteTaskDefinitions = [
  {
    key: 'mediaDistribution',
    label: 'Newsroom',
    route: '/updates',
    description: 'Latest press wire and announcements from our newsroom.',
    contentType: 'mediaDistribution',
    enabled: true,
  },
] as const

export const siteTaskViews = {
  mediaDistribution: '/updates',
} as const
