import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token
    if (!token)
        res.status(400).json({ Error: 'Unauthorized - missing token!' })
    try {
        const decoded = jwt.verify(token, process.env.SECRET_TOKEN)
        req.user = decoded
        next()
    }
    catch (error) {
        console.log(error.message);
        res.status(401).json({ Error: 'Unauthorized - Invalid token' })
    }
}

export const checkRole = (role) => {
    return (req, res, next) => {
        try {
            role.includes(req.user.role) ? next() : 
                res.status(500).send('Access denied. You have no permission to do that!')
        }
        catch (error) {
            return res.status(404).json({ Error: 'Not authorized!' })
        }
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body
    try {
        if (!email || !password)
            return res.status(400).send('All fields are required!')
        const user = await User.findOne({ email: email })
        if (!user)
            return res.status(404).send('Invalid Credentials!')
        const isValidPassword = await bcrypt.compare(password, user.password)
        if (!isValidPassword)
            return res.status(404).send('Invalid Credentials!')
        const token = jwt.sign({ _id: user._id, name: user.name, email: user.email, role: user.role }, process.env.SECRET_TOKEN, { expiresIn: '24h' })
        return res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'None' }).status(200).json({ Message: 'Login Successful!', data: user, token })
    }
    catch (error) {
        console.error(error)
        return res.status(500).json({ error: "Internal Server Error" })
    }
}

export const isUserAuthenticated = (req, res, next) => {
    const token = req.cookies.access_token
    token ? next() : res.status(401).send('Unauthorized!')
}

export const isUserLoggedIn = async (req, res) => {
    try {
        const user = await User.findById({ _id: req.user._id })
        user ? res.status(200).json({ User: user }) : res.status(404).json({ Error: 'User not found!' })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ Error: error.message })
    }
}

export const logout = (req, res) => {
    return res.clearCookie('token').status(200).json({ Message: 'Logged out successfully!' })
}