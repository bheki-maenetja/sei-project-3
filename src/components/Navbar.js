import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import Auth from '../lib/authHelper'

class Navbar extends Component {

  state = {
    isNavbarOpen: false
  }

  toggleNavbar = () => {
    this.setState({ isNavbarOpen: !this.state.isNavbarOpen })
  }

  logoutUser = () => {
    Auth.logout()
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.setState({ isNavbarOpen: false })
    }
  }
  
  render() {
    const { isNavbarOpen } = this.state
    return (
      <nav className='navbar is-dark font-sizing is-fixed-top'>
        <div className="container">
          <div className="navbar-brand">
            <Link className='navbar-item' to='/'>Home</Link>
            <a className={`navbar-burger ${isNavbarOpen ? 'is-active' : ''}`} onClick={this.toggleNavbar}>
              <span></span>
              <span></span>
              <span></span>
            </a>
          </div>
          <div className={`navbar-menu ${isNavbarOpen ? 'is-active' : ''}`}>
            <div className='navbar-end'>
              {Auth.isAuthenticated() && <Link className='navbar-item' to='/trips/new'>Create New Trip</Link>}
              {Auth.isAuthenticated() && <Link className='navbar-item' to='/groups/new'>Create New Group</Link>}
              {!Auth.isAuthenticated() && <Link className='navbar-item' to='/register'>Register</Link>}
              {!Auth.isAuthenticated() && <Link className='navbar-item' to='/login'>Login</Link>}
              {Auth.isAuthenticated() && <Link className='navbar-item' to='/myaccount'>My Account</Link>}
              {Auth.isAuthenticated() && <Link className='navbar-item' to='/' onClick={this.logoutUser}>Logout</Link>}
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

export default withRouter(Navbar)
