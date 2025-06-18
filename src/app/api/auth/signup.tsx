import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '@/lib/mongodb'
import User from '@/models/UserProfile'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()

  await dbConnect()

  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' })
  }

  try {
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }

    const user = new User({ email, password }) // ⚠️ Hash password in real apps
    await user.save()

    res.status(200).json({ message: 'Signup successful' })
  } catch (error) {
    console.error('Signup error:', error)
    res.status(500).json({ message: 'Server error' })
  }
}
