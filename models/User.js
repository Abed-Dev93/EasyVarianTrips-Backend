import { Schema, model } from "mongoose"

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        image: {
            type: String,
        },
        role: {
            type: String,
            enum: ['admin', 'user', 'agency'],
            required: true
        },
        hasPurchased: {
            type: Boolean,
            default: false
        },
        trips: {
            type: [Schema.Types.ObjectId],
            ref: 'Trips'
        }
    },
    {
        timestamps: true
    }
)

const users = model('Users', userSchema)

export default users