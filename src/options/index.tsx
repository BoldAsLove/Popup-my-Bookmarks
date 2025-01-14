import '../manifest.yml'

import * as React from 'react'

import createAndRenderRoot from '../core/utils/createAndRenderRoot.js'
import App from './components/App/index.js'

createAndRenderRoot(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
