import { Schema, SchemaTypes, model } from "mongoose"

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
        avatar: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ['admin', 'user', 'guest'],
            required: true
        },
        priority: {
            type: String,
            enum: ['land', 'sea', 'air'],
            required: true
        },
        interests: {
            type: [String],
            enum: [],
        },
        trip: {
            type: Schema.Types.ObjectId,
            ref: 'Trips'
        }
    },
    {
        timestamps: true
    }
)

const users = model('Users', userSchema)

export default users