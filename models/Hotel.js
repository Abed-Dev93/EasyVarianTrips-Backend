import { Schema, model } from "mongoose"

const hotelSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        rank: {
            type: Number,
            required: true
        },
        images: {
            type: [String],
            required: true
        }
    },
    {
        timestamps: true
    }
)

const hotels = model('Hotels', hotelSchema)

export default hotels