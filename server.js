import express, { urlencoded } from 'express'
import dbConnect from './dbconnect/dbConnection.js'
import cors from 'cors'
import userRouter from './routes/UserRoute.js'
import { login, logout } from './middlewares/Authentication.js'

const app = express()
const port = process.env.PORT

app.use(cors())
app.use(express.json())
app.use('/images', express.static('images'))
app.use(urlencoded({ extended: true }))
app.post('/login', login)
app.get('/logout', logout)
app.use('/user', userRouter)

dbConnect()

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})