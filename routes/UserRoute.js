import express from 'express'
import userController from '../controllers/UserController.js'
import Upload from '../middlewares/Multer.js'
import { verifyToken, checkRole } from '../middlewares/Authentication.js'

const userRouter = express.Router()

userRouter.post('/register', Upload.single('image'), userController.register)
userRouter.get('/allUsers', verifyToken, checkRole(['admin']), userController.getAllUsers)
userRouter.get('/:id', verifyToken, checkRole(['admin']), userController.getUserById)
userRouter.get('/email', verifyToken, checkRole(['admin']), userController.getUserByEmail)
userRouter.get('/location', verifyToken, checkRole(['admin']), userController.getUserByLocation)
userRouter.get('/role', verifyToken, checkRole(['admin']), userController.getUserByRole)
userRouter.get('/trip', verifyToken, checkRole(['admin']), userController.getUserByTrip)
userRouter.get('/hasPurchased', userController.getUserByHasPurchased)
userRouter.put('/:id', verifyToken, checkRole(['admin', 'user', 'agency']), Upload.single('image'), userController.updateUserById)
userRouter.delete('/delete', verifyToken, checkRole(['admin']), userController.deleteUserById)

export default userRouter