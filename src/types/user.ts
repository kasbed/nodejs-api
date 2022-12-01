import { Document } from "mongoose"

export interface IUser extends Document {
  name: string
  lastName: string
  password: string
  email: string
  active: boolean
  profilePic: string
}