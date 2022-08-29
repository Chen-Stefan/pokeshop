import { Request, Response, NextFunction } from 'express';

export const getPrivateData = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    success: true, 
    data: "You are authenticated to view this content"
  })
}