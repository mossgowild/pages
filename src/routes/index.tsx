import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { Page } from '../components/Page'
import { guide } from '../lib/guide.server'

// The data is read and checked on the server; the page's serialized copy hydrates the interactive parts
// (docs/site-rewrite.md Q18).
const getGuide = createServerFn().handler(() => guide())

export const Route = createFileRoute('/')({
  loader: () => getGuide(),
  component: () => <Page guide={Route.useLoaderData()} />,
})
