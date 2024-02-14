import express, { urlencoded } from 'express'
import dbConnect from './dbconnect/dbConnection.js'
import cors from 'cors'

const app = express()
const port = process.env.PORT

app.use(cors())
app.use(express.json())
app.use('/images', express.static('images'))
app.use(urlencoded({ extended: true }))

dbConnect()

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})