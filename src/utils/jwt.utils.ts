import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { IUser } from '../types/user';

export const SECRET_KEY: Secret = process.env.SECRET_KEY || 'somesecret';
export const JWT_DURATION: number = 60*60*24;

const generateJwt = (user: Partial<IUser>, expiration: number) :string => (jwt.sign(user, SECRET_KEY, {expiresIn: expiration}));

const verifyJwt = (token: string) :JwtPayload|string => (jwt.verify(token, SECRET_KEY));

const decodeJwt = (token: string) :JwtPayload|null => (jwt.decode(token, {json: true}))

export {generateJwt, verifyJwt, decodeJwt}