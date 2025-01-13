const { StatusCodes } = require('http-status-codes');

class ServiceError extends Error{
    constructor(
        message = 'Somathing went wrong', 
        expalanation = 'Service layer Error', 
        statusCode = StatusCodes.INTERNAL_SERVER_ERROR 
    ){
        super();
        this.name = ServiceError,
        this.message = message,
        this.expalanation = expalanation,
        this.statusCode = statusCode
    }
};

module.exports = ServiceError;