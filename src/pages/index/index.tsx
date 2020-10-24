import React, { useState, useEffect, Fragment } from 'react'
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import Home from '../home/index'
import Login from '../loginAndRegister/index'
import { hot } from 'react-hot-loader/root'
import NoteResult from '../../components/noteResult/index'

const App = () => {
  return (
    <Fragment>
      <Route path="/login" component={Login}></Route>
      <Route path="/home" component={Home}></Route>
      <Route path="/note/:id" component={NoteResult}></Route>
      <Redirect from="/" to="/login"></Redirect>
    </Fragment>
  )
}

export default hot(App)
