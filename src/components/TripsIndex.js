import React, { Component } from 'react'
import Select from 'react-select'
import countryList from 'react-select-country-list'
import MyTripList from './MyTripsList'

const moment = require('moment')

const budget = [
  { value: '$0 - $100', label: '$0 - $100' },
  { value: '$100 - $300', label: '$100 - $300' },
  { value: '$300 - $500', label: '$300 - $500' },
  { value: '$500 - $1000', label: '$500 - $1000' },
  { value: '$1000 - $2000', label: '$1000 - $2000' },
  { value: '$2000+', label: '$2000+' }
]

const countriesList = countryList().getData()

class TripsIndex extends Component {
  state = {
    select: {
      countries: [],
      startingDate: '',
      endingDate: '',
      category: '',
      budget: []
    },
    startingDate: '',
    endingDate: '',
    categories: [],
    trips: null,
    filteredTrips: []
  }

  async componentDidMount() {
    const { propsData } = this.props
    this.setState({ ...this.state, ...propsData })
  }

  setStartingDate = date => {
    this.setState({
      ...this.state.select,
      select: {
        ...this.state.select,
        startingDate: date
      }
    })
  }

  setEndingDate = date => {
    this.setState({
      ...this.state.select,
      select: {
        ...this.state.select,
        endingDate: date
      }
    })
  }

  handleCountriesSelection = selected => {
    const countries = selected ? selected.map(item => item.label) : []
    this.setState({
      ...this.state,
      select: { ...this.state.select, countries: countries }
    })
  }

  handleBudgetSelection = selected => {
    const selectedBudget = selected ? selected.map(item => item.label) : []
    this.setState({
      ...this.state,
      select: { ...this.state.select, budget: selectedBudget }
    })
  }

  handleCategorySelection = selected => {
    const selectedCategory = selected ? selected.value : []
    this.setState({
      ...this.state,
      select: { ...this.state.select, category: selectedCategory }
    })
  }

  handleFiltering = () => {
    const { startingDate, endingDate, category, countries } = this.state.select
    const filteredTrips = this.state.trips.filter(trip => {
      const countriesMatch =
        countries.length === 0
          ? true
          : trip.countries.some(country => countries.includes(country))

      const dateMatch = () => {
        if (startingDate && !endingDate) {
          if (Date.parse(startingDate) <= Date.parse(trip.startingDate))
            return true
        } else if (endingDate && !startingDate) {
          if (Date.parse(endingDate) >= Date.parse(trip.startingDate))
            return true
        } else if (startingDate && endingDate) {
          if (
            Date.parse(startingDate) <= Date.parse(trip.startingDate) &&
            Date.parse(endingDate) >= Date.parse(trip.startingDate)
          )
            return true
        } else if (!startingDate && !endingDate) {
          return true
        }
      }

      const categoryMatch = !category ? true : trip.category.name === category

      const budgetMatch =
        this.state.select.budget.length === 0
          ? true
          : trip.budget.some(budget =>
            this.state.select.budget.includes(budget)
          )
      if (countriesMatch && categoryMatch && budgetMatch && dateMatch())
        return trip
    })
    this.setState({ ...this.state, filteredTrips })
  }

  handleResetFilter = () => {
    this.setState({ ...this.state, filteredTrips: this.state.trips })
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      ...this.state,
      select: { ...this.state.select, [name]: value }
    })
  }

  render() {
    const tripData = this.state.trips ? this.state : this.props.propsData
    return (
      <section className='section transparent'>
        <div className='container'>
          <div className='columns is-mobile is-multiline'>
            <div className='column is-12-tablet is-8-mobile is-offset-2-mobile card'>
              <div className='field'>
                <h2 className='title has-text-centered'>Search for Trips</h2>
                <div className='control'>
                  <Select
                    name='countries'
                    onChange={this.handleCountriesSelection}
                    options={countriesList}
                    isMulti
                    className='basic-multi-select'
                    classNamePrefix='select'
                    placeholder='Select Destination'
                  />
                </div>
              </div>
              <div className="field">
                <div className='level'>
                  <div className="level-left">
                    <div className='field level-item'>
                      <div className='control'>
                        <label className='label'>Start Date</label>
                        <input
                          className='button'
                          type='date'
                          name='startingDate'
                          onChange={this.handleChange}
                          value={tripData.select.startingDate}
                          min={moment(new Date()).format('YYYY-MM-DD')}
                          max={tripData.select.endingDate}
                        ></input>
                      </div>
                    </div>
                    <div className='field level-item'>
                      <div className='control'>
                        <label className='label'>End Date</label>
                        <input
                          className='button'
                          type='date'
                          name='endingDate'
                          onChange={this.handleChange}
                          value={tripData.select.endingDate}
                          min={tripData.select.startingDate}
                        ></input>
                      </div>
                    </div>
                    <div className="level-right"></div>
                  </div>
                  <div className='field level-item'>
                    <div className='control' style={{ width: '95%' }}>
                      <label className='label'>Trip Type</label>
                      <Select
                        name='category'
                        onChange={this.handleCategorySelection}
                        options={tripData.categories}
                        className='basic-single'
                        classNamePrefix='select'
                        placeholder='Select Trip Type'
                      />
                    </div>
                  </div>
                  <div className='field level-item'>
                    <div className='control' style={{ width: '95%' }}>
                      <label className='label'>Budget</label>
                      <Select
                        name='budget'
                        onChange={this.handleBudgetSelection}
                        options={budget}
                        isMulti
                        className='basic-multi-select'
                        classNamePrefix='select'
                        placeholder='Select Budget'
                      />
                    </div>
                  </div>
                  <div className="level-right"></div>
                </div>
              </div>
              <div className='field'>
                <div className='flex-container'>
                  <button onClick={this.handleFiltering} className='button'>
                    Search
                  </button>
                  <button onClick={this.handleResetFilter} className='button'>
                    Clear Filter
                  </button>
                </div>
              </div>
            </div>
            <div className='container trips-block'>
              <div className='columns is-mobile is-multiline'>
                <div className='column is-12-tablet is-8-mobile is-offset-2-mobile card'>
                  <MyTripList data={tripData.filteredTrips} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default TripsIndex
