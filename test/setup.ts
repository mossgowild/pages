// Vite's ?raw and ?url imports for bun test: the file's text, or its path.
import { plugin } from 'bun'
import { dirname, resolve } from 'node:path'

plugin({
  name: 'vite queries',
  setup(build) {
    build.onResolve({ filter: /\?(raw|url)$/ }, ({ path, importer }) => {
      const [file, query] = path.split('?')
      return { path: resolve(dirname(importer), file), namespace: query }
    })
    build.onLoad({ filter: /.*/, namespace: 'raw' }, async ({ path }) => ({ contents: `export default ${JSON.stringify(await Bun.file(path).text())}`, loader: 'js' }))
    build.onLoad({ filter: /.*/, namespace: 'url' }, ({ path }) => ({ contents: `export default ${JSON.stringify(path)}`, loader: 'js' }))
  },
})
