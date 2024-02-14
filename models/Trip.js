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
            type: price,
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
        purchaseDate: {
            type: Date,
            required: true
        },
        users: {
            type: [Schema.Types.ObjectId],
            ref: 'Users'
        },
        agency: {
            type: Schema.Types.ObjectId,
            ref: 'Transportations'
        },
        transportation: {
            type: Schema.Types.ObjectId,
            ref: 'Transportations'
        },
        hotel: {
            type: Schema.Types.ObjectId,
            ref: 'Hotels'
        },
        region: {
            type: Schema.Types.ObjectId,
            ref: 'Regions'
        }
    },
    {
        timestamps: true
    }
)

const trips = model('Trips', tripSchema)

export default trips