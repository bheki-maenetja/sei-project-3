# SEI-45-Project-3-MERN

# **Project 3: Travelr** <img align="right" src="https://camo.githubusercontent.com/6ce15b81c1f06d716d753a61f5db22375fa684da/68747470733a2f2f67612d646173682e73332e616d617a6f6e6177732e636f6d2f70726f64756374696f6e2f6173736574732f6c6f676f2d39663838616536633963333837313639306533333238306663663535376633332e706e67"/>
## Overview
Travelr - is an online website for searching travel partners. Users can browse and join trips that other users have created or create their own.

This was my third project (and a first group project) as part of the General Assembly Software Engineering Immersive course.

The goal was to build a full stack web application using MERN stack.

Timeframe: 6 days.

Launch on [Heroku](https://travel-with-travelr.herokuapp.com/). Check out the GitHub [Repo](https://github.com/nlukjanov/SEI-45-Project-3-MERN).


## Brief

* **Build a full-stack application** by making your own backend and your own front-end
* **Use an Express API** to serve your data from a Mongo database
* **Consume your API with a separate front-end** built with React
* **Be a complete product** which most likely means multiple relationships and CRUD functionality for at least a couple of models
* **Implement thoughtful user stories/wireframes** that are significant enough to help you know which features are core MVP and which you can cut
* **Have a visually impressive design** to kick your portfolio up a notch and have something to wow future clients & employers. **ALLOW** time for this.
* **Be deployed online** so it's publicly accessible.
* **Have automated tests** for _at least_ one RESTful resource on the back-end. Improve your employability by demonstrating a good understanding of testing principals.

## Technologies Used

* React
* JavaScript (ES6)
* HTML5
* SCSS
* Bulma CSS Framework
* Git
* GitHub
* Bcrypt
* JWT
* Moment.js
* Mongoose
* Heroku
* Trello
* NPM
* Chai
* Mocha
* Mapbox API

## Approach Taken

It was a group project and the first thing we did was brainstorming project ideas. We have put a list of about 15 things we can build to practice newly learnt skills. As I like to travel myself I suggested creating a website where people can search for other people to travel with. We discussed MVP and features we would like to have. We decided that for MVP users should be able to create their trips or join other people’s trips. Also as a separate model we have decided to create travel groups where people can join and discuss travel arrangements.

We planned our project in advance, breaking down tasks and we used Trello to organise our work. 

![trello](/readme-images/trello.png)

After that I have built wireframes using Balsamiq.

![wireframes1](/readme-images/home-mobile.png)
![wireframes2](/readme-images/login.png)
![wireframes3](/readme-images/register.png)
![wireframes4](/readme-images/my-account-mobile.png)

![wireframes5](/readme-images/home-web.png)
![wireframes6](/readme-images/my-account-web.png)

To maximise learning, I suggested rotating, so that each of us worked on models, controllers and frontend. I have built: user model, user controller, authentication, homepage component with search and filtering, my account page wit tabs, set up auto testing using Mocha, Chai and Supertest.

### Functionality
#### User

We decided to do the backend first. In the beginning each of us started working on separate model: user, trip and group
Basic user model:

```JavaScript
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dob: { type: Date, required: true },
  country: { type: String, required: true },
  city: { type: String, required: true },
  gender: { type: String, enum: ['Male', 'Female'], required: true },
  languages: [{ type: String, required: true }],
  profileImage: { type: String, required: true },
})
```

Later my colleague Bheki added comments and likes schemas and virtual models for the trips to the user model.

I was planning to switch to doing my account page on the frontend, so I created user controller.
Current user is set via secure route and jwt token check. Then all the required data is populated from the database. 
```JavaScript
function profile(req, res, next) {
  // add populate to user
  User.findById(req.currentUser._id)
    .populate('organizedTrips')
    .populate('travel_group')
    .populate('joinedTrips')
    .populate('favoriteTrips')
    .populate('travel_groups')
    .populate('favorite_categories')
    .populate('likes.user')
    .populate('comments.user')
    .then(user => res.status(200).json(user))
    .catch(next)
}
```
#### My account

I used React Tabs to create a nice breakdown of the trips and the refactored the trips list into a separate functional component.

```JavaScript
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
```

#### Home page
Home page had filtering and I have written and interesting date filtering where user is shown filtered trips whether selected is only start or end date or both of them.

```JavaScript
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
```
## Bugs

We were fixing bugs as they were appearing, so at the moment there are no known bugs and all the functionality works as it should.
The only things I can think of at the moment is that when a user is registering the account and uploading the picture it goes straight to Cloudinary server even before user submits the registration form. In this case if user has some errors while registering the image will still be uploaded.

## Wins and Blockers
Wins: 
* Working MVP level full stack app
* Great experience in team work
* Experience in collaboration on github with branching, merging and fixing merge conflicts
* I enjoyed setting up and writing tests
* Multi marker map displaying destinations

Blockers:
* We have built quite extensive backend, but eventually did not implement a lot of features on the frontend due to lack of time
* However this is also nice, because any of us can now further develop project, working just on the frontend
* We didn't implement significant feature: accepting/rejecting people on your trip, so at the moment anyone can just join and leave at anytime

## Future Features
* Accepting/Rejecting people joining your trips
* Group trips to show on the group show page
* Friendship between users
* Private/Public trips, shown only to friends or to general public as well
* Liking trips/marking them as "interested in"
* Edit your own profile
* As I said before for most of the features backend is already set up, need to work on frontend to implement
