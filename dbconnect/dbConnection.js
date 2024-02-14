import mongoose from "mongoose"
import 'dotenv/config'

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log('Connected to database successfully!')
    }
    catch (error) {
        console.log('Error connecting to Database', error)
    }
}

export default dbConnect