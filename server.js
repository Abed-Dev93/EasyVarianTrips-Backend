import express, { urlencoded } from 'express'
import dbConnect from './dbconnect/dbConnection.js'
import cors from 'cors'
import userRouter from './routes/UserRoute.js'
import tripRouter from './routes/TripRoute.js'
import purchaseRouter from './routes/PurchaseRoute.js'
import { login, logout, verifyToken, isUserLoggedIn } from './middlewares/Authentication.js'
import cookieParser from 'cookie-parser'

const app = express()
const port = process.env.PORT

app.use(cors({
    origin: 'easy-varian-trips-frontend-ax0xm42kt.vercel.app',
    credentials: true,
    optionsSuccessStatus: 200
}))
app.use(express.json())
app.use(cookieParser())
app.use('/images', express.static('images'))
app.use(urlencoded({ extended: true }))
app.post('/login', login)
app.get('/logout', logout)
app.get('/loggedIn', verifyToken, isUserLoggedIn)
app.use('/user', userRouter)
app.use('/trip', tripRouter)
app.use('/purchase', purchaseRouter)

dbConnect()

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})