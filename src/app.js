import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Notifications from 'react-notify-toast'
import 'bulma'
import './styles/main.scss'

import Navbar from './components/Navbar'
import Home from './components/Home'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import MyAccount from './components/MyAccount'
import NewTrip from './components/NewTrip'
import ShowTrip from './components/ShowTrip'
import EditTrip from './components/EditTrip'
import NewGroup from './components/NewGroup'
import EditGroup from './components/EditGroup'
import SecureRouteFront from './lib/SecureRouteFront'
import ShowGroup from './components/ShowGroup'

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <main>
          <Notifications />
          <Navbar />
          <Switch>
            <Route exact path='/' component={Home}></Route>
            <SecureRouteFront path='/trips/:id/edit' component={EditTrip} />
            <SecureRouteFront path='/trips/new' component={NewTrip} />
            <Route path='/trips/:id' component={ShowTrip}></Route>
            <SecureRouteFront path='/groups/:id/edit' component={EditGroup} />
            <SecureRouteFront path='/groups/new' component={NewGroup} />
            <Route path='/groups/:id' component={ShowGroup} />
            <Route path='/register' component={Register}></Route>
            <Route path='/login' component={Login}></Route>
            <SecureRouteFront path='/myaccount' component={MyAccount} />
          </Switch>
        </main>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
