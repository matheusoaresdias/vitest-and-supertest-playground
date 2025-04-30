import axios from 'axios'
import dotenv from 'dotenv'
import { UserSchema } from '../types/User'
import createError from '../helper/createError'

dotenv.config()

export default async function valdidateUserId(userId: number) {
  try {
    const response = await axios.get(`${process.env.USERS_API!}/users/${userId}`)
    const parsed = UserSchema.safeParse(response && response.data)

    return parsed.success
  } catch (err) {
    console.log(err)
    throw createError('Invalid userId.', 400)
  }
}
