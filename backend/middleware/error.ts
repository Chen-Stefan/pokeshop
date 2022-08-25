import ErrorResponse from '../utilities/errorResponse'
import { Request, Response, NextFunction } from 'express';

// Parameter should always be error first
const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  let error = { ...err };

  error.message = err.message
  // MongoDB error
  if(err.code === 11000) {
    const message = `Dupliacte Field Value Entered`
    error = new ErrorResponse(message, 400)
  }

  if(err.name === 'ValidationError') {
    // Break down the error object and add each error message to our message variable
    
    const message = Object.values(err.errors).map((val: any) => val.message)
    error = new ErrorResponse(message, 400)
    
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error'
  })
}

export default errorHandler