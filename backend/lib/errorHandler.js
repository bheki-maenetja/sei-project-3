function handleError(err, req, res, next) {
  if (err.name === 'ValidationError' || err.message === 'ValidationError') {
    const formattedErrors = {}

    for (const key in err.errors) {
      if (key === 'profileImage' || key === 'imageURL') {
        formattedErrors[key] = 'Please upload image'
      } else if (key === 'passwordConfirmation') {
        formattedErrors[key] = 'Passwords do not match'
      } else {
        formattedErrors[key] = 'This field is required'
      }
    }
    return res.status(422).json({ message: 'Can\'t accept that, try again', errors: formattedErrors })
  }

  if (err.message === 'Not found') {
    return res.status(404).json({ message: 'We couldn\'t find what you were looking 🤷‍♂️' })
  } 

  if (err.message === 'Unauthorized') {
    return res.status(401).json({ message: 'You\'re unauthorized. GET OUT!!!' })
  }

  if (err.name === 'CastError') {
    const formattedErrors = {}

    for (const key in err.errors) {
      formattedErrors[key] = err.errors[key].message
    }

    return res.status(406).json({ message: 'SOMETHING IS VERY WRONG!!!', errors: formattedErrors })
  }

  res.status(500).json({ message: 'Something\'s wrong with our servers' })
  next(err)
}

module.exports = handleError