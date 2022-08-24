import ErrorResponse from '../utilities/errorResponse.js'
// Parameter should always be error first
const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message
  // MongoDB error
  if(err.code === 11000) {
    const message = `Dupliacte Field Value Entered`
    error = new ErrorResponse(message, 400)
  }

  if(err.name === 'ValidationError') {
    // Break down the error object and add each error message to our message variable
    const message = Object.values(err.errors).map(val => val.message)
    error = new ErrorResponse(message, 400)
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error'
  })
}

export default errorHandler