const groupObjs = [
  {
    name: 'The Web Pack',
    description: 'Travelling together and web surfing the world',
    imageURL: 'https://res.cloudinary.com/nlukjanov/image/upload/v1581679539/Travelr/group3_tmmyrw.jpg',
    isPrivate: true
  },
  {
    name: 'Travellin Crew',
    description: 'Going places, seeing faces',
    imageURL: 'https://res.cloudinary.com/nlukjanov/image/upload/v1581679539/Travelr/group4_sbv11c.jpg',
    isPrivate: true
  },
  {
    name: 'Phoebe\'s Flybies',
    description: 'Fly with us',
    imageURL: 'https://res.cloudinary.com/nlukjanov/image/upload/v1581679539/Travelr/group2_hzs8lx.jpg',
    isPrivate: true
  }
]

const userObjs = [
  {
    name: 'Bheki',
    email: 'bheki@email.com',
    password: 'pass',
    passwordConfirmation: 'pass',
    dob: new Date('2000-02-20'),
    country: 'South Africa',
    city: 'Johannesburg',
    gender: 'Male',
    languages: ['Sotho', 'English'],
    profileImage: 'https://res.cloudinary.com/nlukjanov/image/upload/v1581617113/travelr/wcwchh1kzm218xpwxmlg.jpg'
  },
  {
    name: 'Nik',
    email: 'nik@email.com',
    password: 'pass',
    passwordConfirmation: 'pass',
    dob: new Date('1988-01-01'),
    country: 'Russia',
    city: 'Moscow',
    gender: 'Male',
    languages: ['Russian', 'English'],
    profileImage: 'https://res.cloudinary.com/nlukjanov/image/upload/v1581508679/travelr/ash68jg45te3gjrlldzu.jpg'
  },
  {
    name: 'Can',
    email: 'can@email.com',
    password: 'pass',
    passwordConfirmation: 'pass',
    dob: new Date('1996-01-31'),
    country: 'Turkey',
    city: 'Istanbul',
    gender: 'Male',
    languages: ['Turkish', 'English'],
    profileImage: 'https://res.cloudinary.com/nlukjanov/image/upload/v1581602706/travelr/gxf5iozk2ltyleghuvla.jpg'
  }
]

const tripObjs = [
  {
    name: 'An English summer on the beach',
    organizer: 'Bheki',
    countries: ['United Kingdom'],
    startingDate: new Date('2020-03-01'),
    endingDate: new Date('2020-03-05'),
    category: 'Beach',
    description: 'Let us go by the see and have some fun! The weather should be nice!',
    participants: [],
    interested: [],
    budget: ['$0 - $100', '$100 - $300']
  },
  {
    name: 'Jungle Trek',
    organizer: 'Can',
    countries: ['India', 'Thailand', 'Indonesia'],
    startingDate: new Date('2020-06-10'),
    endingDate: new Date('2020-06-20'),
    category: 'Beach',
    description: 'Multi country trip in Asia. Starting in India and then going to Thailand and Indonesia. Main goal is to enjoy the nature and trek the jungles',
    participants: [],
    interested: [],
    budget: ['$300 - $500', '$500 - $1000']
  },
  {
    name: 'Skiing in the Alps',
    organizer: 'Nik',
    countries: ['France', 'Italy'],
    startingDate: new Date('2020-03-15'),
    endingDate: new Date('2020-03-30'),
    category: 'Skiing',
    description: 'Two weeks trip in Alps! Starting in France in 3 Valleys then going to Italian Dolomites.',
    participants: [],
    interested: [],
    budget: ['$500 - $1000']
  },
  {
    name: 'Skiing in France',
    organizer: 'Nik',
    countries: ['France'],
    startingDate: new Date('2020-01-10'),
    endingDate: new Date('2020-01-20'),
    category: 'Skiing',
    description: 'Skiing week in France, plan to go to Tignes, but flexible',
    participants: [],
    interested: [],
    budget: ['$500 - $1000']
  },
  {
    name: 'Skiing in Italy',
    organizer: 'Nik',
    countries: ['Italy'],
    startingDate: new Date('2020-02-01'),
    endingDate: new Date('2020-02-10'),
    category: 'Skiing',
    description: '10 days of skiing in Italy. Would like to go to Campitello Di Fassa',
    participants: [],
    interested: [],
    budget: ['$500 - $1000']
  },
  {
    name: 'Surfing trip in Morocco',
    organizer: 'Nik',
    countries: ['Morocco'],
    startingDate: new Date('2020-03-15'),
    endingDate: new Date('2020-03-30'),
    category: 'Other',
    description: 'Want to go catch some waves, weather should be already warm. But the water is always cold! Remember to take wetsuit.',
    participants: [],
    interested: [],
    budget: ['$300 - $500', '$500 - $1000']
  },
  {
    name: 'City break in Paris',
    organizer: 'Can',
    countries: ['France'],
    startingDate: new Date('2020-05-05'),
    endingDate: new Date('2020-05-08'),
    category: 'Other',
    description: 'Long weekend in Paris',
    participants: [],
    interested: [],
    budget: ['$300 - $500', '$500 - $1000']
  },
  {
    name: 'Kite surfing in Egypt',
    organizer: 'Nik',
    countries: ['Egypt'],
    startingDate: new Date('2020-04-15'),
    endingDate: new Date('2020-04-30'),
    category: 'Other',
    description: 'Nice and windy weather in Egypt this time of the year. Join to have lots of fun',
    participants: [],
    interested: [],
    budget: ['$300 - $500', '$500 - $1000']
  },
  {
    name: 'Sightseeing in Italy',
    organizer: 'Bheki',
    countries: ['Italy'],
    startingDate: new Date('2020-04-15'),
    endingDate: new Date('2020-04-30'),
    category: 'Other',
    description: 'Enjoy architecure and nice weather in Italy',
    participants: [],
    interested: [],
    budget: ['$100 - $300', '$300 - $500']
  },
  {
    name: 'Visiting Turkey',
    organizer: 'Can',
    countries: ['Turkey'],
    startingDate: new Date('2020-08-15'),
    endingDate: new Date('2020-08-30'),
    category: 'Other',
    description: 'Flying hot air balloons in Cappadocia',
    participants: [],
    interested: [],
    budget: ['$300 - $500', '$500 - $1000']
  },
  {
    name: 'Hiking in Pyrenees then going to Portugal',
    organizer: 'Nik',
    countries: ['Spain', 'France', 'Portugal'],
    startingDate: new Date('2020-07-15'),
    endingDate: new Date('2020-07-25'),
    category: 'Other',
    description: 'Flying to France then quick 5 days trip to Northern spain Pyrenees. Hiking and camping along the way. Bring your backpack and tent. After that taking bus to Portugal Porto.',
    participants: [],
    interested: [],
    budget: ['$300 - $500']
  }
]

const categoryObjs = [
  {
    name: 'Beach'
  },
  {
    name: 'Skiing'
  },
  {
    name: 'Safari'
  },
  {
    name: 'Other'
  }
]

module.exports = { userObjs, tripObjs, categoryObjs, groupObjs }
