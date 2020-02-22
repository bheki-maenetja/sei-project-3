import React from 'react'
import { Link } from 'react-router-dom'
var moment = require('moment')

import Auth from '../lib/authHelper'

const MyTripList = ({ data }) => {
  if (data.length === 0 ) {
    return (
      <div className='container card box flex-container'>
        <div className='column has-text-centered'>Nothing Found</div>
      </div>
    )
  }
  return (
    <section>
      {data.map(trip => {
        return (
          <div key={trip._id} className='container card box flex-container'>
            <Link
              to={Auth.isAuthenticated() ? `/trips/${trip._id}` : '/login'}
              className='container flex-container'
            >
              <div className='column has-text-centered'>{trip.name}</div>
              <div className='column has-text-centered'>
                {trip.countries.join(', ')}
              </div>
              <div className='column has-text-centered'>
                Start: {moment(trip.startingDate).format('Do MMM YYYY')}
              </div>
              <div className='column has-text-centered'>
                Finish: {moment(trip.startingDate).format('Do MMM YYYY')}
              </div>
            </Link>
          </div>
        )
      })}
    </section>
  )
}
export default MyTripList
