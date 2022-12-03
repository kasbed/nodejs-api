import jwt, { Secret, JwtPayload } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { decodeJwt, verifyJwt } from '../utils/jwt.utils'

export interface CustomRequest extends Request {
  token: string | JwtPayload | null
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '')
    if (!token || !verifyJwt(token)) {
      throw new Error()
    }
    (req as CustomRequest).token = decodeJwt(token)
    next()
  } catch (err) {
    res.status(401).send('Not Authorized')
  }
}
