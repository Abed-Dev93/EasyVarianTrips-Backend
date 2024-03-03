import { Schema, model } from "mongoose"

const tripSchema = new Schema(
    {
        category: {
            type: String,
            enum: ['land', 'sea', 'flight'],
            required: true
        },
        type: {
            type: String,
            enum: ['mountain', 'desert', 'coast', 'glacier', 'city tour', 'nature'],
            required: true
        },
        shortDescription: {
            type: String,
            required: true
        },
        description: {
            type: String,
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
        fromLocation: {
            type: String,
            required: true
        },
        toLocation: {
            type: [String],
            required: true
        },
        duration: {
            type: Number
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
        country: {
            type: String,
            required: true
        },
        hotel: {
            type: String,
            required: true
        },
        transit: {
            type: String,
            enum: ['stop', 'non-stop'],
            required: true
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