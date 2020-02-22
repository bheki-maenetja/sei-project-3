import React from 'react'
import axios from 'axios'

class ImageUpload extends React.Component {
  state = {
    image: null
  }

  handleUpload = async ({ target: { files } }) => {
    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', 'travelr')
    const res = await axios.post(
      'https://api.cloudinary.com/v1_1/nlukjanov/image/upload',
      data
    )
    this.setState({ image: res.data.url }, () => {
      this.props.handleChange({
        target: { name: this.props.fieldName, value: res.data.url }
      })
    })
  }

  render() {
    // defaults can be set as variables here
    const labelClass = this.props.labelClassName
      ? this.props.labelClassName
      : 'default_class'
    const { image } = this.state
    return (
      <>
        {image ? (
          <div>
            <img src={image} alt='group image' />
          </div>
        ) : (
          <>
            <div className='upload-btn-wrapper button is-fullwidth'>
              <button className='btn'>Upload a file</button>
              <label className={labelClass}>{this.props.labelText}</label>
              <input type='file' onChange={this.handleUpload} />
            </div>

            
          </>
        )}
      </>
    )
  }
}

export default ImageUpload
