import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import 'antd/dist/antd.css'
import { HashRouter as Router, Route, Redirect } from 'react-router-dom'
import App from './pages/index/index'

const renderRoot = (App) =>
  ReactDOM.render(
    <Fragment>
      <Router>
        <App></App>
      </Router>
    </Fragment>,
    document.getElementById('app')
  )

renderRoot(App)
