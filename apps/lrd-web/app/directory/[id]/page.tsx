import { MOCK_EXPERTS, getExpert } from './experts'
import { ExpertDetailContent } from './ExpertDetailContent'

// `output: 'export'` cannot render dynamic routes on demand, so every expert
// page is enumerated here and prerendered at build time.
export function generateStaticParams() {
  return MOCK_EXPERTS.map((expert) => ({ id: expert.id }))
}

export default async function ExpertDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return <ExpertDetailContent expert={getExpert(id)} />
}
