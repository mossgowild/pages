import { createMemoryHistory, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

// The page is one route, and the browser's history belongs to the detail sheet and the image preview, which push their
// own #event-id entries. On the browser's history the router would take each of those as a navigation — reload the
// route and scroll the page to the row or to the top, under the sheet as it flies — so in the browser it keeps a
// history of its own.
export function getRouter() {
  const history = typeof window === 'undefined' ? undefined : createMemoryHistory({ initialEntries: [location.pathname + location.search] })
  return createRouter({ routeTree, history })
}
