import React, { Component } from 'react'
import axios from 'axios'
import moment from 'moment'
import Auth from '.././lib/authHelper'
import ReactTextCollapse from 'react-text-collapse'

const TEXT_COLLAPSE_OPTIONS = {
  collapse: false, // default state when component rendered
  collapseText: '... show more', // text to show when collapsed
  expandText: 'show less', // text to show when expanded
  minHeight: 100, // component height when closed
  maxHeight: 250, // expanded to
  textStyle: { // pass the css for the collapseText and expandText here
    color: 'blue',
    fontSize: '20px'
  }
}

const TEXT_COLLAPSE_OPTIONS_MEMBERS = {
  collapse: false,
  collapseText: '... show more', 
  expandText: 'show less', 
  minHeight: 200, 
  maxHeight: 250, 
  textStyle: {
    color: 'blue',
    fontSize: '20px'
  }
}


class ShowGroup extends Component {

  state = {
    data: {
      name: '',
      description: '',
      imageURL: '',
      members: [],
      likes: [],
      comments: []
    },
    newComment: {
      text: ''
    }
  }

  componentDidMount(){
    try {
      this.getGroupData()
    } catch (error) {
      console.log(error)
    }
  }

  getGroupData = async () => {
    const res = await axios.get(`/api/groups/${this.props.match.params.id}`)

    this.setState({ data: res.data })
  }

  handleCommentDelete = async (comment) => {
    try {
      await axios.delete(`/api/groups/${this.props.match.params.id}/${comment._id}/comment`, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      await this.getGroupData()
      this.setState({ newComment: { text: '' } })
    } catch (err) {
      console.log(err)
    }
  }

  handleCommentSubmit = async e => {
    e.preventDefault()

    try {
      const res = await axios.post(`/api/groups/${this.props.match.params.id}/comment`, this.state.newComment, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      await this.getGroupData()
      this.setState({ newComment: { text: '' } })
    } catch (err) {
      console.log(err)
    }
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ newComment: { [name]: value } })
  }
  _element = React.createRef()

  render() {
    return (
      <div>
        <section className='hero is-primary is-medium'>
          <div className='hero-body'>
            <div className='container has-text-centered'>
              <h1 className='title'>
                {this.state.data.name}
              </h1>
            </div>
          </div>
        </section>
        <section>
          <br />
          <div className='columns is-vcentered' style={{ marginTop: '100px' }}>
            <div className=' column notification is-warning' style={{ minHeight: '230px' }}>
              <ReactTextCollapse
                options={TEXT_COLLAPSE_OPTIONS}
              >
                <h3 className='bd-notification is-half has-text-centered'>Description</h3>
                <div>
                  {this.state.data.description}
                </div>
              </ReactTextCollapse>
            </div>
            <div className='column notification is-danger has-text-centered' style={{ minHeight: '200px' }} >
              <ReactTextCollapse
                options={TEXT_COLLAPSE_OPTIONS_MEMBERS}
              >
                <h3 className='bd-notification is-half'>Members</h3>
                <br />
                {this.state.data.members.map(member => (
                  <div key={member.user.id} style={{ display: 'inline-block' }}>
                    <figure className='image'>
                      <img style={{ width: '100px', height: '100px', marginLeft: '10px' } } src={member.user.profileImage} />{' '}
                      {member.user.name}
                    </figure>
                  </div>
                ))}
              </ReactTextCollapse>
            </div>
          </div>
        </section>
        <div>
          <br />
          <br />
          <div className='container'>
            <div className='column notification box'>
              <form onSubmit={this.handleCommentSubmit} className='media'>
                <div className='media-content'>
                  <div className='field'>
                    <p className='control'>
                      <textarea
                        name='text'
                        onChange={this.handleChange}
                        className='textarea'
                        placeholder='Add a comment...'
                        value={this.state.newComment.text}
                      ></textarea>
                    </p>
                  </div>
                  <nav className='level'>
                    <div className='level-left'>
                      <div className='level-item'>
                        <button type='submit' className='button is-info'>
                Submit
                        </button>
                      </div>
                    </div>
                  </nav>
                </div>
              </form>
            </div>
          </div>
        </div>
        <section className='section'>
          <div className='container'>
            <div className='columm notification box'>
              {this.state.data.comments.map(comment => (
                <div key={comment._id} className='box'>
                  <article className='media'>
                    <div className='media-content'>
                      <div className='content'>
                        <strong>{comment.user.name}</strong>{' '}
                        <small>{moment(comment.createdAt).format('MMM Do YYYY')}</small>
                        <p>{comment.text}</p>
                      </div>
                    </div>
                    <div className='media-right'>
                      <button onClick={() => this.handleCommentDelete(comment)} className='delete'></button>
                    </div>
                  </article>
                </div>
              ))}
            </div>
            <div>
              <div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }

}

export default ShowGroup