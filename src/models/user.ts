import { IUser } from '../types/user'
import { model, Schema } from 'mongoose'

const userSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true
    },

    lastName: {
      type: String,
      required: true
    },

    password: {
      type: Boolean,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    active: {
      type: Boolean,
      required: true
    },
    profilePic: {
      type: String
    }
  },
  { timestamps: true }
)

export default model<IUser>('User', userSchema)
