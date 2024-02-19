import express from 'express'
import userController from '../controllers/UserController.js'
import Upload from '../middlewares/Multer.js'
import { verifyToken } from '../middlewares/Authentication.js'

const userRouter = express.Router()

userRouter.post('/register', Upload.single('image'), userController.register)

export default userRouter