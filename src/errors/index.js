const CustomAPIError = require('./custom-api')
const UnauthenticatedError = require('./unauthenticated')
const UnauthorizedError = require('./Unauthorized')
const NotFoundError = require('./not-found')
const BadRequestError = require('./bad-request')

module.exports = {
  CustomAPIError,
  UnauthenticatedError,
  UnauthorizedError,
  NotFoundError,
  BadRequestError,
}
