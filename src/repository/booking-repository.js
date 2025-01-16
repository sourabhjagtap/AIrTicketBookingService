const {StatusCodes} = require('http-status-codes');
const { Booking } = require('../models/index');
const { ValidationError, AppError} = require('../utils/errors/index');

class BookingRepository {
    async create(data){
        try {
            const booking = await Booking.create(data);
            return booking;
        } catch (error) {
            if(error.name == 'SequelizeValidationError'){
                throw new ValidationError(error);
            }
            throw new AppError( 
                'RepositoryError' , 
                'Cannot create Booking',
                'There was some server issue please try again later',
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }

    async updateBooking(bookingId,data){
        try {
            // await Booking.update(data,{
            //     where: {
            //         id:bookingId
            //     }
            // });
            //return true;
//-------------------------------------------------------------------------
            const booking = await Booking.findByPk(bookingId);
            if(data.status){
                booking.status = data.status;
            }
            await booking.save();
            return booking;
        } catch (error) {
            throw new AppError(
                'RepositoryError',
                'Cannot update the booking',
                'There was some issue updating the booking, please try again later',
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }
}

module.exports = BookingRepository;