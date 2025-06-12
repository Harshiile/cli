import { Request, Response, NextFunction } from 'express'
import { CLIError } from '../controllers/utils/error';
import { jwtValidate } from '../controllers/utils/jwt';
import { JwtPayload } from 'jsonwebtoken';
export const middleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) throw new CLIError(403, "Unauthorized User");

    const { username } = jwtValidate(token) as JwtPayload
    req.username = username;
    next()
}