import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import fs from 'fs/promises'
import Trip from '../models/Trip.js'

const userController = {
    register: async (req, res) => {
        const { name, email, password, location, role } = req.body
        const image = req.file?.path
        if (!name || !email || !password || !location || !role)
            return res.status(400).send('All fields are required!')
        try {
            const existingUser = await User.findOne({ email: email })
            if (existingUser)
                return res.status(402).json({ Error: 'Wrong Credentials' })
            const hashedPassword = await bcrypt.hash(password, 10)
            const newUser = new User({
                name,
                email,
                password: hashedPassword,
                location,
                image,
                role
            })
            await newUser.save()
            const token = jwt.sign({ _id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role }, process.env.SECRET_TOKEN, { expiresIn: '24h' })
            res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'None' })
            return res.status(200).json({ User: newUser })
        }
        catch (error) {
            console.log(error)
            return  res.status(500).json({ error: "Internal Server Error" })
          }
    },
    getAllUsers: async (req, res) => {
        try {
          const allUsers = await User.find()
          return   res.status(200).json({ Users: allUsers })
        } catch (error) {
          return  res.status(500).json({ message: error.message })
        }
      },
      getUserById: async (req, res) => {
        const id = req.params.id
        try {
          const user = await User.findById({ _id: id })
          user ? res.status(200).json({ User: user }) : res.status(404).json({ Message: "User not found" })
        } catch (error) {
          return  res.status(500).json({ Error: error.message })
        }
      },
      getUserByEmail: async (req, res) => {
        const email = req.body.email
        try {
          const user = await User.findOne({ email: email })
          user ? res.status(200).json({ User: user }) : res.status(404).json({ Message: "Error occured" })
        } catch (error) {
          return  res.status(500).json({ Error: error.message })
        }
      },
      getUserByLocation: async (req, res) => {
        const location = req.body.location
        try {
          const users = await User.find({ location: location })
          users ? res.status(200).json({ Users: users }) : res.status(404).json({ Message: "Error occured" })
        } catch (error) {
          return  res.status(500).json({ Error: error.message })
        }
      },
      getUserByRole: async (req, res) => {
        const role = req.body.role
        try {
          const users = await User.find({ role: role })
          users ? res.status(200).json({ Users: users }) : res.status(404).json({ Message: "Error occured" })
        } catch (error) {
          return  res.status(500).json({ Error: error.message })
        }
      },
      getUserByHasPurchased: async (req, res) => {
        try {
          const users = await User.find({ hasPurchased: true })
          users ? res.status(200).json({ Users: users }) : res.status(404).json({ Message: "Error occured" })
        } catch (error) {
          return  res.status(500).json({ Error: error.message })
        }
      },
      getUserByTrip: async (req, res) => {
        const tripId = req.body.tripId
        try {
            const trip = await Trip.findById({ _id: tripId })
            if (!trip)
                res.status(200).send(`Trip ${tripId} is not valid!`)
            const users = await User.find({ _id: { $in: trip.users } })
            users ? res.status(200).json({ Users: users }) :
                res.status(404).send('Error occured!')
        }
        catch (error) {
            return  res.status(500).json({ Error: error.message })
          }
      },
      updateUserById: async (req, res) => {
        const { name, email, oldPassword, password, location, role } = req.body
        const image = req.file?.path
        const id = req.params.id
        try {
            const user = await User.findById({ _id: id })
            if (!user)
                return res.status(404).json({ Message: "User not found" })
            let isOldPasswordValid = true, oldAvatar = user.image
            if (password)
                isOldPasswordValid = await bcrypt.compare(oldPassword, user.password)
            if (!isOldPasswordValid)
                return res.status(401).json({ message: "Invalid old password" })
            const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined
            if (user.role === 'admin') {
            const editUser = await User.findByIdAndUpdate({ _id: id }, {
                name,
                email,
                password: hashedPassword,
                location,
                image,
                role
            })
            await editUser.save()
            await fs.unlink(oldAvatar)
          }
          else if (user.role === 'user' || user.role === 'agency') {
            const editUser = await User.findByIdAndUpdate({ _id: id }, {
                name,
                email,
                password: hashedPassword,
                location,
                image
            })
            await editUser.save()
            await fs.unlink(oldAvatar)
          }
            editUser ? res.status(200).send(`User ${id} has been updated successfully!`) :
                res.status(400).send('Error occured!')
        }
        catch (error) {
            return  res.status(500).json({ message: error.message })
          }
      },
      deleteUserById: async (req, res) => {
        const id = req.body.id
        try {
            const user = await User.findById({ _id: id })
            user ? await User.findByIdAndDelete({ _id: id })  :
                res.status(404).json({ Message: "User not found" })
        }
        catch (error) {
            return  res.status(500).json({ message: error.message })
          }
      }
}

export default userController