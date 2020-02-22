import React, { Component } from 'react'
import axios from 'axios'
import TripsIndex from './TripsIndex'
import GroupIndex from './GroupIndex'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

class Home extends Component {

  state = { 
    tabIndex: 0,
    trips: [],
    categories: [],
    groupsData: {
      groups: null,
      filteredGroups: []
    },
    tripsData: {
      select: {
        countries: [],
        startingDate: '',
        endingDate: '',
        category: '',
        budget: []
      },
      startingDate: new Date(),
      endingDate: new Date(),
      categories: [],
      trips: null,
      filteredTrips: []
    }  
  }

  async componentDidMount() {
    try {
      const res = await Promise.all([
        axios.get('/api/groups'),
        axios.get('/api/categories'),
        axios.get('/api/trips')
      ])
      const { groupsData, tripsData } = this.state
      groupsData.groups = res[0].data
      groupsData.filteredGroups = res[0].data

      tripsData.categories = this.setTripCategories(res[1].data)
      tripsData.trips = res[2].data
      tripsData.filteredTrips = res[2].data

      this.setState({ ...this.state, groupsData, tripsData })
    } catch (err) {
      console.log(err)
    }
  }

  setTripCategories = res => {
    const categoriesArray = []
    res.forEach(category => {
      const selectCategory = {}
      selectCategory['value'] = category.name
      selectCategory['label'] = category.name
      return categoriesArray.push(selectCategory)
    })
    return categoriesArray
  }

  render() {
    if (!this.state.tripsData.trips || !this.state.groupsData.groups) return null
    return (
      <section className='is-fullheight-with-navbar background'>
        <div className='hero is-medium is-bold'>
          <div className='hero-body'>
            <div className='container has-text-centered plate'>
              <h1 className='title header-title'>Travelr</h1>
              <h2 className='subtitle header-subtitle'>Never travel alone</h2>
            </div>
          </div>
        </div>
        <div className=''>
          <Tabs
            selectedIndex={this.state.tabIndex}
            onSelect={tabIndex => this.setState({ tabIndex })}
          >
            <TabList className='tabs is-fullwidth is-centered'>
              <Tab className='has-text-centered tab-select' selectedClassName={'active-tab'}>Trips</Tab>
              <Tab className='has-text-centered tab-select' selectedClassName={'active-tab'}>Groups</Tab>
            </TabList>
            <TabPanel><TripsIndex propsData={this.state.tripsData}/></TabPanel>
            <TabPanel><GroupIndex propsData={this.state.groupsData}/></TabPanel>
          </Tabs>
        </div>
      </section>
    )
  }
}

export default Home
