import React from 'react'
import Select from 'react-select'
import countryList from 'react-select-country-list'

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

const TripForm = ({
  trip,
  categories,
  errors,
  handleChange,
  handleCountriesSelection,
  handleBudgetSelection,
  handleSubmit
}) => {
  return (
    <div className='columns'>
      <form onSubmit={handleSubmit} className='column is-6 is-offset-3'>
        <h2 className='title'>Create New Trip</h2>
        <div className='field'>
          <label className='label'>Make a name for your trip</label>
          <div className='control'>
            <input
              className={`input ${errors.name ? 'is-danger' : ''}`}
              placeholder='Name'
              name='name'
              onChange={handleChange}
              value={trip.name}
            />
          </div>
          {errors.name && (
            <small className='has-text-danger'>{errors.name}</small>
          )}
        </div>
        <div className='field'>
          <div
            className='control'
            style={
              errors.countries
                ? { border: '1px solid red', borderRadius: '5px' }
                : {}
            }
          >
            <Select
              name='countries'
              onChange={handleCountriesSelection}
              options={countriesList}
              isMulti
              className='basic-multi-select'
              classNamePrefix='select'
              placeholder='Select Destination'
              required
            />
          </div>
          {errors.countries && (
            <small className='has-text-danger'>
              {errors.countries}
            </small>
          )}
        </div>
        <div className='field'>
          <div className='control'>
            <label className='label'>Start Date</label>
            <input
              className={`input ${errors.name ? 'is-danger' : ''}`}
              type='date'
              name='startingDate'
              onChange={handleChange}
              value={trip.startingDate}
              min={moment(new Date()).format('YYYY-MM-DD')}
              max={trip.endingDate}
            ></input>
          </div>
          {errors.startingDate && (
            <small className='has-text-danger'>
              {errors.startingDate}
            </small>
          )}
        </div>
        <div className='field'>
          <div className='control'>
            <label className='label'>End Date</label>
            <input
              className={`input ${errors.name ? 'is-danger' : ''}`}
              type='date'
              name='endingDate'
              onChange={handleChange}
              value={trip.endingDate}
              min={trip.startingDate}
            ></input>
          </div>
          {errors.endingDate && (
            <small className='has-text-danger'>
              {errors.endingDate}
            </small>
          )}
        </div>
        <div className='field'>
          <label className='label'>Category</label>
          <div className='control'>
            <select
              className={`input ${errors.name ? 'is-danger' : ''}`}
              placeholder='Category'
              name='category'
              onChange={handleChange}
              value={trip.category}
            >
              <option key disabled value=''>
                Pick A Category
              </option>
              {categories.map(category => {
                return (
                  <option
                    key={category._id}
                    value={`${category._id}`}
                  >{`${category.name}`}</option>
                )
              })}
            </select>
          </div>
          {errors.category && (
            <small className='has-text-danger'>
              {errors.category}
            </small>
          )}
        </div>
        <div className='field'>
          <label className='label'>Budget</label>
          <div
            className='control'
            style={
              errors.budget
                ? { border: '1px solid red', borderRadius: '5px' }
                : {}
            }
          >
            <Select
              name='budget'
              onChange={handleBudgetSelection}
              options={budget}
              isMulti
              className='basic-multi-select'
              classNamePrefix='select'
              placeholder='Select Budget'
            />
          </div>
          {errors.budget && (
            <small className='has-text-danger'>
              {errors.budget}
            </small>
          )}
        </div>
        <div className='field'>
          <label className='label'>Description</label>
          <div className='control'>
            <textarea
              className={`textarea ${
                errors.description ? 'is-danger' : ''
              }`}
              placeholder='Description'
              name='description'
              onChange={handleChange}
              value={trip.description}
            />
          </div>
          {errors.description && (
            <small className='has-text-danger'>
              {errors.description}
            </small>
          )}
        </div>
        <div className='field'>
          <button type='submit' className='button is-fullwidth is-warning'>
            Make my trip! 🌍
          </button>
        </div>
      </form>
    </div>
  )
}

export default TripForm
