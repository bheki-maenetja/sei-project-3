import React, { Component } from 'react'
import axios from 'axios'
import Auth from '../lib/authHelper'
import TripForm from './TripForm'

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
    categories: [],
    errors: {}
  }

  async componentDidMount() {
    try {
      const res = await axios.get('/api/categories')
      this.setState({
        ...this.state,
        categories: res.data
      })
    } catch (err) {
      console.log(err)
      this.setState({ errors: err.response.data.errors })
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

  handleSubmit = async e => {
    e.preventDefault()
    try {
      const res = await axios.post('/api/trips', this.state.trip, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.props.history.push(`/trips/${res.data._id}`)
    } catch (error) {
      this.setState({ errors: error.response.data.errors })
    }
  }

  render() {
    return (
      <section className='section'>
        <section className='section'>
          <div className='container'>
            <TripForm
              trip={this.state.trip}
              categories={this.state.categories}
              errors={this.state.errors}
              handleChange={this.handleChange}
              handleBudgetSelection={this.handleBudgetSelection}
              handleCountriesSelection={this.handleCountriesSelection}
              handleSubmit={this.handleSubmit}
            />
          </div>
        </section>
      </section>
    )
  }
}

export default NewTrip
