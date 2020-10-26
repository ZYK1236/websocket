import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import 'antd/dist/antd.css'
import { HashRouter as Router, Route, Redirect } from 'react-router-dom'
import App from './pages/index/index'
import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'

const renderRoot = (App) =>
  ReactDOM.render(
    <Fragment>
      <Router>
        <App></App>
      </Router>
    </Fragment>,
    document.getElementById('app')
  )

Sentry.init({
  dsn:
    'https://0fa3f4378c094f2583e025becab0afd0@o466703.ingest.sentry.io/5481221',
  integrations: [new Integrations.BrowserTracing()],

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 0.7
})

renderRoot(App)
