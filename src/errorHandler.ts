import { Request, Response, NextFunction } from 'express';
import { CLIError } from './controllers/utils/error';

export function errorHandler(
    err: CLIError,
    req: Request,
    res: Response,
    next: NextFunction
) {
    const status = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    res.status(status).send(message);
}
