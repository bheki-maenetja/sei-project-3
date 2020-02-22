import React, { Component } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import axios from 'axios'
import Auth from '../lib/authHelper'
import MyTripList from './MyTripsList'
var moment = require('moment')

class MyAccount extends Component {
  state = { tabIndex: 0, user: {} }

  async componentDidMount() {
    const res = await axios.get('api/profile', {
      headers: { Authorization: `Bearer ${Auth.getToken('token')}` }
    })
    this.setState({
      ...this.state,
      user: res.data
    })
  }

  completedTrips = trips => {
    if (!trips) return null
    return trips.filter(trip => {
      return Date.parse(trip.endingDate) < Date.now()
    })
  }

  render() {
    if (!this.state.user) return null
    if (!this.state.user.dob) return null
    const {
      name,
      dob,
      country,
      city,
      gender,
      languages,
      organizedTrips,
      joinedTrips,
      favoriteTrips
    } = this.state.user
    return (
      <section className='section font-sizing profile-back'>
        <section className="section">
          <div className='hero is-small'>
            <div className='columns columns-padding'>
              <div className='column is-4'>
                <figure className='image profile-image'>
                  <img
                    className='is-rounded'
                    src={this.state.user.profileImage}
                    alt='profile image'
                  />
                </figure>
              </div>
              <div className='column is-3 is-offset-1 flex-container-column'>
                <div className='container'>Name:</div>
                <div className='container'>Age:</div>
                <div className='container'>Country:</div>
                <div className='container'>City:</div>
                <div className='container'>Gender:</div>
                <div className='container'>Languages spoken:</div>
              </div>
              <div className='column is-3 flex-container-column'>
                <div className='container'>{name}</div>
                <div className='container'>
                  {moment().diff(`${dob}`, 'years')}
                </div>
                <div className='container'>{country}</div>
                <div className='container'>{city}</div>
                <div className='container'>{gender}</div>
                <div className='container'>
                  {languages.map((language, index) => {
                    return <span key={index}>{`${language.charAt(0).toUpperCase() + language.slice(1)} `}</span>
                  })}
                </div>
              </div>
            </div>
          </div>
          <Tabs
            className='columns-padding transparent'
            selectedIndex={this.state.tabIndex}
            onSelect={tabIndex => this.setState({ tabIndex })}
          >
            <TabList className='tabs is-fullwidth is-centered font-sizing'>
              <Tab className='has-text-centered tab-pointer' selectedClassName={'active-tab'}>
                Organized Trips
              </Tab>
              <Tab className='has-text-centered tab-pointer' selectedClassName={'active-tab'}>
                Joined Trip
              </Tab>
              <Tab className='has-text-centered tab-pointer' selectedClassName={'active-tab'}>
                Trips Interested In
              </Tab>
              <Tab className='has-text-centered tab-pointer' selectedClassName={'active-tab'}>
                Completed Trips
              </Tab>
            </TabList>
            <TabPanel>
              <MyTripList data={organizedTrips} />
            </TabPanel>
            <TabPanel>
              <MyTripList data={joinedTrips} />
            </TabPanel>
            <TabPanel>
              <MyTripList data={favoriteTrips} />
            </TabPanel>
            <TabPanel>
              <MyTripList data={this.completedTrips(organizedTrips)} />
            </TabPanel>
          </Tabs>
        </section>
      </section>
    )
  }
}

export default MyAccount
