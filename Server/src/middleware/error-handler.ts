import { Request, Response, NextFunction } from 'express';
import { CustomAPIError } from '../errors/custom-error';

const errorHandlerMiddleware = (err: Error, req: Request, res: Response, next: NextFunction): Response<any, Record<string, any>> | undefined => {
    if (err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({ message: err.message });
    } else {
        return res.status(500).json({ message: 'Something went wrong, please try again later' });
    }
};

export default errorHandlerMiddleware;