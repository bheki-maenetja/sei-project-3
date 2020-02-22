import React, { Component } from 'react'
import axios from 'axios'
import Select from 'react-select'
import ImageUpload from '../ImageUpload'
import { Link } from 'react-router-dom'
import { notify } from 'react-notify-toast'

const options = [
  { value: 'English', label: 'English' },
  { value: 'French', label: 'French' },
  { value: 'German', label: 'German' },
  { value: 'Russian', label: 'Russian' },
  { value: 'Japanese', label: 'Japanese' },
  { value: 'Turkish', label: 'Turkish' }
]

class Register extends Component {
  state = {
    credentials: {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      dob: '',
      country: '',
      city: '',
      gender: 'Male',
      languages: [],
      profileImage: ''
    },
    errors: {}
  }

  handleChange = ({ target: { name, value } }) => {
    const data = { ...this.state.credentials, [name]: value }
    this.setState({ credentials: data })
  }

  handleMultiSelect = lang => {
    if (!lang)
      return this.setState({
        credentials: { ...this.state.credentials, languages: [] }
      })
    const newLanguages = lang.map(language => language.value)
    const data = { ...this.state.credentials, languages: newLanguages }
    this.setState({ credentials: data })
  }

  handleSubmit = async e => {
    e.preventDefault()
    try {
      const res = await axios.post('/api/register', this.state.credentials)
      notify.show(res.data.message, 'success', 3000)
      this.props.history.push('/login')
    } catch (error) {
      this.setState({ errors: error.response.data.errors })
    }
  }

  render() {
    return (
      <section className='section'>
        <section className="section">
          <div className='container'>
            <div className='columns'>
              <form
                className='column is-6 is-offset-3'
                onSubmit={this.handleSubmit}
              >
                <h2 className='title'>Register</h2>
                <div className='field'>
                  <label className='label'>Name</label>
                  <div className='control'>
                    <input
                      className={`input ${
                        this.state.errors.name ? 'is-danger' : ''
                      }`}
                      type='text'
                      name='name'
                      placeholder='Full Name'
                      onChange={this.handleChange}
                    ></input>
                  </div>
                  {this.state.errors.name && (
                    <small className='help is-danger'>
                      {this.state.errors.name}
                    </small>
                  )}
                </div>
                <div className='field'>
                  <label className='label'>Email</label>
                  <div className='control'>
                    <input
                      className={`input ${
                        this.state.errors.email ? 'is-danger' : ''
                      }`}
                      type='text'
                      name='email'
                      placeholder='E-mail'
                      onChange={this.handleChange}
                    ></input>
                  </div>
                  {this.state.errors.email && (
                    <small className='help is-danger'>
                      {this.state.errors.email}
                    </small>
                  )}
                </div>
                <div className='field'>
                  <label className='label'>Password</label>
                  <div className='control'>
                    <input
                      className={`input ${
                        this.state.errors.password ? 'is-danger' : ''
                      }`}
                      type='password'
                      placeholder='Password'
                      name='password'
                      onChange={this.handleChange}
                    />
                  </div>
                  {this.state.errors.password && (
                    <small className='help is-danger'>
                      {this.state.errors.password}
                    </small>
                  )}
                </div>
                <div className='field'>
                  <label className='label'>Password Confirmation</label>
                  <div className='control'>
                    <input
                      className={`input ${
                        this.state.errors.passwordConfirmation ? 'is-danger' : ''
                      }`}
                      type='password'
                      placeholder='Password Confirmation'
                      name='passwordConfirmation'
                      onChange={this.handleChange}
                    />
                  </div>
                  {this.state.errors.passwordConfirmation && (
                    <small className='help is-danger'>
                      {this.state.errors.passwordConfirmation}
                    </small>
                  )}
                </div>
                <div className='field'>
                  <label className='label'>Date Of Birth</label>
                  <div className='control'>
                    <input
                      className={`input ${
                        this.state.errors.dob ? 'is-danger' : ''
                      }`}
                      type='date'
                      name='dob'
                      placeholder='Date of Birth '
                      onChange={this.handleChange}
                    />
                  </div>
                  {this.state.errors.dob && (
                    <small className='help is-danger'>
                      {this.state.errors.dob}
                    </small>
                  )}
                </div>
                <div className='field'>
                  <label className='label'>Country</label>
                  <div className='control'>
                    <input
                      className={`input ${
                        this.state.errors.country ? 'is-danger' : ''
                      }`}
                      type='text'
                      name='country'
                      placeholder='Country'
                      onChange={this.handleChange}
                    />
                  </div>
                  {this.state.errors.country && (
                    <small className='help is-danger'>
                      {this.state.errors.country}
                    </small>
                  )}
                </div>
                <div className='field'>
                  <label className='label'>City</label>
                  <div className='control'>
                    <input
                      className={`input ${
                        this.state.errors.city ? 'is-danger' : ''
                      }`}
                      type='text'
                      name='city'
                      placeholder='City'
                      onChange={this.handleChange}
                    />
                  </div>
                  {this.state.errors.city && (
                    <small className='help is-danger'>
                      {this.state.errors.city}
                    </small>
                  )}
                </div>
                <div className='field'>
                  <label className='label'>Gender</label>
                  <div className='control'>
                    <select
                      className={`input ${
                        this.state.errors.gender ? 'is-danger' : ''
                      }`}
                      name='gender'
                      onChange={this.handleChange}
                    >
                      <option disabled>Select a Gender</option>
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                  </div>
                  {this.state.errors.gender && (
                    <small className='help is-danger'>
                      {this.state.errors.gender}
                    </small>
                  )}
                </div>
                <div className='field'>
                  <label className='label'>Languages</label>
                  <div className='control'>
                    <Select
                      name='languages'
                      isMulti
                      options={options}
                      className={`basic-multi-select ${
                        this.state.errors.languages ? 'is-danger' : ''
                      }`}
                      onChange={this.handleMultiSelect}
                    />
                  </div>
                  {this.state.errors.languages && (
                    <small className='help is-danger'>
                      {this.state.errors.languages}
                    </small>
                  )}
                </div>
                <div className='field'>
                  <label className='label'>Profile Image</label>
                  <div className='control'>
                    <ImageUpload
                      handleChange={this.handleChange}
                      fieldName='profileImage'
                      labelClassName={`${
                        this.state.errors.languages ? 'is-danger' : ''
                      }`}
                    />
                  </div>
                  {this.state.errors.profileImage && (
                    <small className='help is-danger'>
                      {this.state.errors.profileImage}
                    </small>
                  )}
                </div>
                <div className='field'>
                  <button
                    type='submit'
                    className='button is-fullwidth is-primary'
                  >
                    Join Travelr
                  </button>
                </div>
                <div className="field">
                  <p className="subtitle has-text-centered is-6">Already have an account? <Link to='/login'>Login</Link></p>
                </div>
              </form>
            </div>
          </div>
        </section>
      </section>
    )
  }
}

export default Register
