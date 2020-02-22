import React, { Component } from 'react'
import axios from 'axios'
import Auth from '../../lib/authHelper'
import { Link } from 'react-router-dom'
import { notify } from 'react-notify-toast'

class Login extends Component {
  state = {
    credentials: {
      email: '',
      password: ''
    },
    error: ''
  }

  handleChange = ({ target: { name, value } }) => {
    const data = { ...this.state.credentials, [name]: value }
    this.setState({ credentials: data })
  }

  handleSubmit = async e => {
    e.preventDefault()
    try {
      const res = await axios.post('api/login', this.state.credentials)
      Auth.setToken(res.data.token)
      notify.show(res.data.message, 'success', 3000)
      this.props.history.push('/')
    } catch (error) {
      this.setState({ error: 'Incorrect Credentials' })
    }
  }

  render() {
    return (
      <section className='section'>
        <section className="section">
          <div className='container'>
            <div className='columns'>
              <form
                onSubmit={this.handleSubmit}
                className='column is-half is-offset-one-quarter'
              >
                <h2 className='title'>Login</h2>
                <div className='field'>
                  <label className='label'>Email</label>
                  <div className='control'>
                    <input
                      className={`input ${this.state.error ? 'is-danger' : ''}`}
                      name='email'
                      placeholder='Email'
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className='field'>
                  <label className='label'>Password</label>
                  <div className='control'>
                    <input
                      className={`input ${this.state.error ? 'is-danger' : ''}`}
                      type='password'
                      name='password'
                      placeholder='Password'
                      onChange={this.handleChange}
                    />
                  </div>
                  {this.state.error && (
                    <small className='help is-danger'>{this.state.error}</small>
                  )}
                </div>
                <div className="field">
                  <button type='submit' className='button is-primary is-fullwidth'>
                    Login
                  </button>
                </div>
                <div className="field">
                  <p className="subtitle has-text-centered is-6">Don&apos;t have an account? <Link to='/register'>Register</Link></p>
                </div>
              </form>
            </div>
          </div>
        </section>
      </section>
    )
  }
}

export default Login
