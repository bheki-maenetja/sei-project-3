import React, { Component } from 'react'
import axios from 'axios'
import Select from 'react-select'
import countryList from 'react-select-country-list'
import Auth from '../lib/authHelper'

const countriesList = countryList().getData()
const moment = require('moment')

const budget = [
  { value: '$0 - $100', label: '$0 - $100' },
  { value: '$100 - $300', label: '$100 - $300' },
  { value: '$300 - $500', label: '$300 - $500' },
  { value: '$500 - $1000', label: '$500 - $1000' },
  { value: '$1000 - $2000', label: '$1000 - $2000' },
  { value: '$2000+', label: '$2000+' }
]

class NewTrip extends Component {
  state = {
    trip: {
      name: '',
      countries: [],
      startingDate: '',
      endingDate: '',
      category: '',
      description: '',
      budget: []
    },
    categories: []
  }

  async componentDidMount() {
    const tripId = this.props.match.params.id
    try {
      const res = await Promise.all([
        axios.get('/api/categories'),
        axios.get(`/api/trips/${tripId}`)
      ])
      this.setState({
        ...this.state,
        categories: res[0].data,
        trip: res[1].data
      })
    } catch (err) {
      console.log(err)
    }
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      ...this.state,
      trip: { ...this.state.trip, [name]: value }
    })
  }

  handleCountriesSelection = selected => {
    const selectedCountries = selected ? selected.map(item => item.label) : []
    this.setState({
      ...this.state,
      trip: { ...this.state.trip, countries: selectedCountries }
    })
  }

  handleBudgetSelection = selected => {
    const selectedBudget = selected ? selected.map(item => item.label) : []
    this.setState({
      ...this.state,
      trip: { ...this.state.trip, budget: selectedBudget }
    })
  }

  setStartingDate = date => {
    this.setState({
      ...this.state.trip,
      trip: {
        ...this.state.trip,
        startingDate: date
      }
    })
  }

  setEndingDate = date => {
    this.setState({
      ...this.state.trip,
      trip: {
        ...this.state.trip,
        endingDate: date
      }
    })
  }

  handleSubmit = async e => {
    e.preventDefault()
    const tripId = this.props.match.params.id
    try {
      const res = await axios.put(`/api/trips/${tripId}`, this.state.trip, {
        headers: { Authorization: `Bearer ${Auth.getToken('token')}` }
      })
      this.props.history.push(`/trips/${res.data._id}`)
    } catch (error) {
      console.log(error.res)
    }
  }

  createTripCountriesSelect = trip => {
    const tripCountriesArray = []
    trip.countries.forEach(country => {
      const tripCountriesObject = {}
      tripCountriesObject.label = country
      tripCountriesObject.value = country
      tripCountriesArray.push(tripCountriesObject)
    })
    return tripCountriesArray
  }

  createTripBudgetSelect = trip => {
    const tripBudgetArray = []
    trip.budget.map(budget => {
      const tripBudgetObject = {}
      tripBudgetObject.label = budget
      tripBudgetObject.value = budget
      tripBudgetArray.push(tripBudgetObject)
    })
    return tripBudgetArray
  }

  render() {
    if (!this.state) return null
    return (
      <section className='section'>
        <div className='container'>
          <div className='columns'>
            <form
              onSubmit={this.handleSubmit}
              className='column is-6 is-offset-3'
            >
              <h2 className='title'>Edit Your Trip</h2>
              <div className='field'>
                <label className='label'>Make a name for your trip</label>
                <div className='control'>
                  <input
                    className='input'
                    placeholder='Name'
                    name='name'
                    onChange={this.handleChange}
                    value={this.state.trip.name}
                  />
                </div>
              </div>
              <div className='field'>
                <div className='control'>
                  <Select
                    name='countries'
                    onChange={this.handleCountriesSelection}
                    options={countriesList}
                    value={this.createTripCountriesSelect(this.state.trip)}
                    isMulti
                    className='basic-multi-select'
                    classNamePrefix='select'
                    placeholder='Select Destination'
                  />
                </div>
              </div>
              <div className='field'>
                <div className='control'>
                  <label className='label'>Start Date</label>
                  <input
                    className='button'
                    type='date'
                    name='startingDate'
                    onChange={this.handleChange}
                    value={this.state.trip.startingDate}
                    min={moment(new Date()).format('YYYY-MM-DD')}
                    max={this.state.trip.endingDate}
                  ></input>
                </div>
              </div>
              <div className='field'>
                <div className='control'>
                  <label className='label'>End Date</label>
                  <input
                    className='button'
                    type='date'
                    name='endingDate'
                    onChange={this.handleChange}
                    value={this.state.trip.endingDate}
                    min={this.state.trip.startingDate}
                  ></input>
                </div>
              </div>
              <div className='field'>
                <label className='label'>Category</label>
                <div className='control'>
                  <select
                    className='select'
                    placeholder='Category'
                    name='category'
                    onChange={this.handleChange}
                    value={this.state.trip.category}
                  >
                    <option key disabled value=''>
                      Pick A Category
                    </option>
                    {this.state.categories.map(category => {
                      return (
                        <option
                          key={category._id}
                          value={`${category._id}`}
                        >{`${category.name}`}</option>
                      )
                    })}
                  </select>
                </div>
              </div>
              <div className='field'>
                <label className='label'>Budget</label>
                <div className='control'>
                  <Select
                    name='budget'
                    onChange={this.handleBudgetSelection}
                    options={budget}
                    value={this.createTripBudgetSelect(this.state.trip)}
                    isMulti
                    className='basic-multi-select'
                    classNamePrefix='select'
                    placeholder='Select Budget'
                  />
                </div>
              </div>
              <div className='field'>
                <label className='label'>Description</label>
                <div className='control'>
                  <textarea
                    className='textarea'
                    placeholder='Description'
                    name='description'
                    onChange={this.handleChange}
                    value={this.state.trip.description}
                  />
                </div>
              </div>
              <div className='field'>
                <button
                  type='submit'
                  className='button is-fullwidth is-warning'
                >
                  Make my trip! 🌍
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    )
  }
}

export default NewTrip
