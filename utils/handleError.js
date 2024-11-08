const CustomError = require('./customError');

function handleError(message, error, statusCode = 500) {
  if (error instanceof CustomError) {
    throw error;
  } else if (error.name === 'CastError')
    throw new CustomError('Invalid ID format', 400);
  else {
    throw new CustomError(message + ': ' + error.message, statusCode);
  }
}
module.exports = handleError;
