import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import Auth from './authHelper'

const SecureRouteFront = ({ component: Component, ...rest }) => {
  if (Auth.isAuthenticated()) return <Route {...rest} component={Component} />
  Auth.logout()
  return <Redirect to='/login' />
}

export default SecureRouteFront