import { JwtPayload, sign, verify } from 'jsonwebtoken'

export const jwtValidate = (token: string) => verify(token, process.env.JWT_SECRET!)

export const jwtGenerate = (payload: JwtPayload) => sign(payload, process.env.JWT_SECRET!)