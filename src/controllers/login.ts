import { Response, Request } from 'express'
import { IUser } from './../types/user'
import User from '../models/user'
import { isValidPassword, hashPassword } from '../utils/password.utils'
import {decodeJwt, generateJwt, JWT_DURATION} from '../utils/jwt.utils'
import { JwtPayload } from 'jsonwebtoken'

const doLogin = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body
  const users: Array<IUser> = await User.find({ email })
  if (!users || users.length === 0) {
    res
      .status(404)
      .json({
        status: 'error',
        message: `User email ${email} is not in database`
      })
  } else if (users.length > 1) {
    res
      .status(500)
      .json({
        status: 'error',
        message: `User email ${email} is duplicated in database`
      })
  } else {
    const user: Partial<IUser> = users[0]
    const loggedIn = isValidPassword(password, user.password || '')
    delete user.password
    res
      .status(loggedIn ? 200 : 400)
      .json(
        loggedIn
          ? { status: 'success', user: user, jwt: generateJwt(user, JWT_DURATION)}
          : { status: 'error', message: 'Bad password' }
      )
  }
}

const registerUser = async (req: Request, res: Response) :Promise<void> => {
    const { email } = req.body
    const users: Array<IUser> = await User.find({ email })
    if (!users || users.length === 0) {
        try {
            type NewType = Pick<IUser,'name' | 'lastName' | 'password' | 'email' | 'profilePic' | 'admin'>
        
            const body = req.body as NewType
        
            const user: IUser = new User({
              name: body.name,
              lastName: body.lastName,
              password: hashPassword(body.password), 
              email: body.email,
              profilePic: body.profilePic || 'genericimage', //TODO: do generic profile image base64 an return if user don't have any
              active: true,
              admin: body.admin || false
            })      
            const newUser: IUser = await user.save()
            res.status(201).json({ message: 'User added', id: newUser._id })
          } catch (error) {
            throw error
          }
    } else {
        res.status(400).json({status: 'error', message: 'Email already in use'})
    }
}

const getProfile = async (req: Request, res: Response) :Promise<void> => {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if(token) {
        const userJwt :JwtPayload | null  = decodeJwt(token);
        const users: Array<IUser> = await User.find({email: userJwt?.eamil || '', active: true});
        if (!users || users.length === 0) {
            res.status(404).json({status: 'error',message: 'User not found is in database'})
        } else if (users.length  > 1) {
            res.status(500).json({status: 'error', message: 'Can not determinate user for toke'});
        } else {
          const user: Partial<IUser> = users[0]
          delete user.password
          res.status(200).json(user)
        }
    } else
        res.status(401).send('Not Authorized')
}
export { doLogin, registerUser, getProfile }
