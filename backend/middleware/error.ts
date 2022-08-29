import ErrorResponse from '../utilities/errorResponse'
import { Request, Response, NextFunction } from 'express';

// Parameter should always be error first
const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  // err是传过来的Promise, 先destructure把object取出来，再设置一下message
  // 最后res.status.json 里面再把error.message 放到自定义的errorMessage key里
  let error = { ...err };

  error.message = err.message
  // MongoDB error
  if(err.code === 11000) {
    const message = `Dupliacte Field Value Entered`
    error = new ErrorResponse(message, 400)
  }

  if(err.name === 'ValidationError') {
    // Break down the error object and add each error message to our message variable
    
    const message: any = Object.values(err.errors).map((val: any) => val.message)
    error = new ErrorResponse(message, 400)
    
  }

  res.status(error.statusCode || 500).json({
    success: false,
    errorMessage: error.message || 'Server Error'
  })
}

export default errorHandler