import React, { Component } from 'react'
import axios from 'axios'
import MapGL, { NavigationControl, Marker } from 'react-map-gl'
import Auth from '../lib/authHelper'
import { Link } from 'react-router-dom'
const moment = require('moment')

const mapboxToken = process.env.MAPBOX_ACCESS_TOKEN
class ShowTrip extends Component {
  state = {
    data: {
      countries: [],
      budget: [],
      participants: [],
      interested: [],
      organizer: {
        languages: []
      },
      startingDate: '',
      endingDate: '',
      category: {},
      description: '',
      likes: [],
      comments: []
    },
    viewport: {
      latitude: 0,
      longitude: 0,
      zoom: 2,
      bearing: 0,
      pitch: 0
    },
    markers: null
  }

  async componentDidMount() {
    try {
      const res = await this.getTripData()
      this.getCountriesCoordinates(res)
      this.setState({ data: res.data })
    } catch (error) {
      console.log(error)
    }
  }

  getCountriesCoordinates = async res => {
    const response = await Promise.all(
      res.data.countries.map(country => {
        return axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${country}.json?access_token=${mapboxToken}`
        )
      })
    )
    this.setState({
      ...this.state,
      viewport: {
        ...this.state.viewport,
        latitude: response[0].data.features[0].center[1],
        longitude: response[0].data.features[0].center[0]
      },
      markers: response
    })
  }

  getTripData = async () => {
    return await axios.get(`/api/trips/${this.props.match.params.id}`)
  }

  calculateAge() {
    const dob = new Date(this.state.data.organizer.dob)
    const today = new Date()
    let age = today.getFullYear() - dob.getFullYear()
    const m = today.getMonth() - dob.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
      age = age - 1
    }
    return age
  }

  handleJoin = async () => {
    try {
      await axios.get(`/api/trips/${this.props.match.params.id}/join`, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      const res = await this.getTripData()
      this.setState({ data: res.data })
    } catch (error) {
      console.log(error)
    }
  }

  isOwner = () => Auth.getPayload().sub === this.state.data.organizer._id

  render() {
    if (!this.state.data) return null
    if (!this.state.markers) return null
    const userJoinedTrip = this.state.data.participants.some(
      item => item.user._id === Auth.getPayload().sub
    )
    return (
      <section className='section'>
        <div className='tile is-ancestor'>
          <div className='tile is-22'>
            <section className='section' style={{ marginLeft: '4%' }}>
              <div className='tile'>
                <div className='tile is-parent'>
                  <div className='tile is-child notification is-info'>
                    <figure className='image is-4by3'>
                      <img src={this.state.data.organizer.profileImage} />
                    </figure>
                  </div>
                </div>
              </div>
              <div className='tile is-child notification is-warning'>
                <div className='tile'>
                  <div className='content'>
                    <h3 className='title'>Organizer</h3>
                    <br />
                    <div>Name: {this.state.data.organizer.name}</div>
                    <br />
                    <div>Gender: {this.state.data.organizer.gender}</div>
                    <br />
                    <div>Age: {this.calculateAge()}</div>
                    <br />
                    <div>Email: {this.state.data.organizer.email}</div>
                    <br />
                    <div>
                      Country of Origin: {this.state.data.organizer.country}
                    </div>
                    <br />
                    <p>
                      Spoken languages:{' '}
                      {this.state.data.organizer.languages.map(
                        (lang, index) => {
                          if (
                            this.state.data.organizer.languages.length - 1 ===
                            index
                          ) {
                            return lang
                          }
                          return lang + ', '
                        }
                      )}
                    </p>
                    <br />
                  </div>
                </div>
              </div>
            </section>
            <section className='section' style={{ minWidth: '40%' }}>
              <div className='tile is-parent'>
                <div className='tile is-child notification is-success'>
                  <div className='content'>
                    <h3 className='title'>Trip</h3>
                    <div>{this.state.data.name}</div>
                    <br />
                    <label>Countries:</label>
                    <div>
                      {this.state.data.countries.map((country, index) => {
                        return <div key={index}>{country}</div>
                      })}
                    </div>
                    <br />
                    <label>
                      Budget:{' '}
                      {this.state.data.budget.map((budget, index) => {
                        return <div key={index}>{budget}</div>
                      })}
                    </label>
                    <br />
                    <label>Starting Date:</label>
                    <div>
                      {moment(this.state.data.startingDate).format(
                        'YYYY MMM DD'
                      )}
                    </div>
                    <br />
                    <label>Ending Date:</label>
                    <div>
                      {moment(this.state.data.endingDate).format('YYYY MMM DD')}
                    </div>
                    <br />
                    <label>Category:</label>
                    <div>{this.state.data.category.name}</div>
                    <br />
                    <label>Description:</label>
                    <div>{this.state.data.description}</div>
                    <br />
                    <button onClick={this.handleJoin} className='button'>
                      {userJoinedTrip ? 'Leave the Trip' : 'Join the Trip'}
                    </button>
                    <br />
                    {this.isOwner() && (
                      <>
                        <Link
                          to={`/trips/${this.state.data._id}/edit`}
                          className='button'
                        >
                          Edit Trip
                        </Link>
                      </>
                    )}
                    <br />
                    <label>Participants:</label>
                    <br />
                    <div>
                      {this.state.data.participants.map(participant => {
                        return (
                          <div
                            key={participant.user.id}
                            style={{ display: 'inline-block' }}
                          >
                            <figure className='image'>
                              <img
                                className='is-rounded'
                                style={{ width: '100px', height: '100px' }}
                                src={participant.user.profileImage}
                              />{' '}
                              <br /> {participant.user.name}
                            </figure>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <div></div>
            </section>
            <section className='section'>
              <div className='tile'>
                <MapGL
                  mapboxApiAccessToken={mapboxToken}
                  ref={this.mapRef}
                  height={'85vh'}
                  width={'60vh'}
                  {...this.state.viewport}
                  mapStyle='mapbox://styles/mapbox/streets-v11'
                  onViewportChange={viewport => this.setState({ viewport })}
                  // minZoom={2}
                >
                  <div style={{ position: 'absolute', right: 0 }}>
                    <NavigationControl />
                  </div>
                  {this.state.markers.map((marker, index) => {
                    return (
                      <Marker
                        key={index}
                        latitude={marker.data.features[0].center[1]}
                        longitude={marker.data.features[0].center[0]}
                      >
                        <div>📌</div>
                      </Marker>
                    )
                  })}
                </MapGL>
              </div>
            </section>
          </div>
        </div>
      </section>
    )
  }
}

export default ShowTrip
