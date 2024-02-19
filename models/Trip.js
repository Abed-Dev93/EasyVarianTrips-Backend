import { Schema, model } from "mongoose"

const tripSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        interests: {
            type: [String],
            required: true
        },
        startDate: {
            type: Date,
            required: true
        },
        endDate: {
            type: Date,
            required: true
        },
        duration: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        images: {
            type: [String],
            required: true
        },
        capacity: {
            type: Number,
            required: true
        },
        reservedPlaces: {
            type: Number,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        purchaseDate: {
            type: Date,
            required: true
        },
        transportation: {
            type: Schema.Types.ObjectId,
            ref: "Transportations"
        },
        hotel: {
            type: Schema.Types.ObjectId,
            ref: 'Hotels'
        },
        users: {
            type: [Schema.Types.ObjectId],
            ref: 'Users'
        }
    },
    {
        timestamps: true
    }
)

const trips = model('Trips', tripSchema)

export default trips