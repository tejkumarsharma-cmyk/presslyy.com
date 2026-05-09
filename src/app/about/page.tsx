import Link from 'next/link'
import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { SITE_CONFIG } from '@/lib/site-config'

const principles = [
  {
    title: 'Clarity beats noise',
    description:
      'Presslyy is built for teams that need their announcements to read credibly in feeds, indexes, and inboxes—without gimmicks.',
  },
  {
    title: 'Structure scales',
    description:
      'Consistent headlines, summaries, and article pages reduce review cycles and make multi-channel distribution easier to trust.',
  },
  {
    title: 'Humans stay in the loop',
    description:
      'Automation should support editorial judgment: approvals, embargoes, and corrections stay first-class.',
  },
]

export default function AboutPage() {
  return (
    <PageShell
      title={`About ${SITE_CONFIG.name}`}
      description={`${SITE_CONFIG.name} helps organizations publish press releases with a modern newsroom experience and distribution-friendly formatting.`}
      actions={
        <>
          <Button asChild>
            <Link href="/contact">Contact</Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <Card className="border-[#16003b]/10 bg-white shadow-sm">
          <CardContent className="space-y-5 p-6 sm:p-8">
            <Badge className="bg-[#16003b]/10 text-[#16003b] hover:bg-[#16003b]/15">Our mission</Badge>
            <h2 className="text-2xl font-semibold tracking-[-0.02em] text-[#16003b]">
              Make press distribution feel as serious as the story behind it.
            </h2>
            <p className="text-sm leading-relaxed text-[#7f8487]">
              We focus on one job: help communications teams ship polished releases and keep a public archive that looks intentional.
              No borrowed marketplace UI, no noisy social feed—just a disciplined newsroom surface.
            </p>
            <p className="text-sm leading-relaxed text-[#7f8487]">
              Whether you are announcing product milestones, partnerships, or policy updates, the reading experience should feel calm,
              fast, and trustworthy.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button asChild className="bg-[#f73d93] hover:bg-[#e02d82]">
                <Link href="/updates">Browse newsroom</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        <div className="space-y-4">
          {principles.map((p) => (
            <Card key={p.title} className="border-[#16003b]/10 bg-[#f6f4f8]/80 shadow-sm">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-[#16003b]">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#7f8487]">{p.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageShell>
  )
}
