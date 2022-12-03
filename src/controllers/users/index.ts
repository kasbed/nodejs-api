import { Response, Request } from 'express'
import { IUser } from './../../types/user'
import User from '../../models/user'
import { hashPassword } from '../../utils/password.utils'

const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users: IUser[] = await User.find()
    res.status(200).json({ users })
  } catch (error) {
    throw error
  }
}

const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user: IUser | null = await User.findById(req.params.id)
    res.status(user ? 200 : 404).json({ user } || { resp: 'User not found' })
  } catch (error) {
    throw error
  }
}

const addUser = async (req: Request, res: Response): Promise<void> => {
  try {
    type NewType = Pick<
      IUser,
      'name' | 'lastName' | 'password' | 'email' | 'profilePic' | 'admin'
    >

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
}

const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      params: { id },
      body
    } = req
    const {password, ...rest} = body
    const user: IUser | null = await User.findByIdAndUpdate(
      { _id: id },
      {password: hashPassword(password), ...rest} //TODO: password and profile picture management
    )
    res.status(user ? 200 : 404).json(
      user
        ? {
            message: 'User updated',
            id: user?._id
          }
        : { message: 'User not found' }
    )
  } catch (error) {
    throw error
  }
}

const disableUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      params: { id },
      body
    } = req
    const user: IUser | null = await User.findByIdAndUpdate(
      { _id: id },
      { active: false }
    )
    res.status(user ? 200 : 404).json(
      user
        ? {
            message: 'User disabled',
            id: user?._id
          }
        : { message: 'User not found' }
    )
  } catch (error) {
    throw error
  }
}

const enableUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      params: { id },
      body
    } = req
    const user: IUser | null = await User.findByIdAndUpdate(
      { _id: id },
      { active: true }
    )
    res.status(user ? 200 : 404).json(
      user
        ? {
            message: 'User disabled',
            id: user?._id
          }
        : { message: 'User not found' }
    )
  } catch (error) {
    throw error
  }
}

const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedUser: IUser | null = await User.findByIdAndRemove(
      req.params.id
    )
    res.status(200).json({
      message: 'User deleted'
    })
  } catch (error) {
    throw error
  }
}

export {
  getUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
  disableUser,
  enableUser
}
