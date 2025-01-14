import type * as React from 'react'
import * as ReactDom from 'react-dom/client'

export default function createAndRenderRoot<P>(
  app: React.ReactElement<P>,
): ReactDom.Root {
  const rootEl = document.getElementById('root')
  if (!rootEl) throw new TypeError('#root not found')

  const root = ReactDom.createRoot(rootEl)
  root.render(app)

  return root
}
