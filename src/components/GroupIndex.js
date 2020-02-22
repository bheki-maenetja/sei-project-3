import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Auth from '../lib/authHelper'

class GroupIndex extends Component {
  state = {
    groups: null,
    filteredGroups: []
  }

  async componentDidMount() {
    const { propsData } = this.props
    try {
      this.setState({
        groups: propsData.groups,
        filteredGroups: propsData.groups
      })
    } catch (err) {
      console.log(err)
    }
  }

  handleChange = ({ target: { value } }) => {
    const filteredGroups = this.state.groups.filter(group => {
      return group.name.toLowerCase().includes(value.toLowerCase())
    })
    this.setState({ filteredGroups })
  }

  render() {
    const groupData = this.state.groups ? this.state : this.props.propsData
    return (
      <section className='section'>
        <div className='container transparent'>
          <div className='columns is-mobile is-multiline'>
            <div className='column is-12-tablet is-8-mobile is-offset-2-mobile card'>
              <div className='field'>
                <div className='control'>
                  <h2 className='title has-text-centered'>
                    Search for travel groups
                  </h2>
                  <div className='field'>
                    <div className='control'>
                      <input
                        className='input'
                        name='search'
                        placeholder='Search for travel groups'
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='column is-12-tablet is-8-mobile is-offset-2-mobile card'>
              {groupData.filteredGroups.map(group => {
                return (
                  <div key={group._id} className='column'>
                    <div>
                      <Link
                        to={
                          Auth.isAuthenticated()
                            ? `/groups/${group._id}`
                            : '/login'
                        }
                      >
                        <div className='card'>
                          <div className='card-header'>
                            <h2 className='card-header-title group-title'>{group.name}</h2>
                            <h3 className='card-header-title group-subtitle'>
                              {group.description}
                            </h3>
                          </div>
                          <div className='card-image'>
                            <img src={group.imageURL} alt='group image' />
                            <div>
                              {group.members.map(member => (
                                <p key={member._id}>
                                  Members: {member.user.name}
                                </p>
                              ))}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default GroupIndex
