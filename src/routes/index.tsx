import { createFileRoute } from '@tanstack/react-router'
import { Page } from '../components/Page'
import { guide } from '../lib/guide'

// ponytail: rendered on the server only while nothing hydrates (src/routes/__root.tsx), so the data needs no loader and
// adds no serialized copy to the page; L2 decides how the interactive parts get it.
export const Route = createFileRoute('/')({
  component: () => <Page guide={guide()} />,
})
