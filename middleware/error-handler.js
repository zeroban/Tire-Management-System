const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {


  let customError = {
    // set defaults
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong try again later'
  }

  // searching for validation error when registering user
  if (err.name === 'ValidationError') {
    customError.msg = Object.values(err.errors).map((item) => item.message).join(', ')
    customError.statusCode = 400 // error code should be 400
  }

  // searching for if user already has a registerd account based off email address
  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)} field, please choose another value`
    customError.statusCode = 400
  }

  // searching for cast error when searching for single tire ID
  if (err.name === 'CastError') {
    customError.msg = `No item found with id: ${err.value}`
    customError.statusCode = 404
  }

  // leaving commented code out for possibly future use if needed
  return res.status(customError.statusCode).json({ msg: customError.msg })

}

module.exports = errorHandlerMiddleware
