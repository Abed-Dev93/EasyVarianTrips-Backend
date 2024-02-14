import { Schema, model } from "mongoose"

const transportationSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        departureLocation: {
            type: String,
            required: true
        },
        arrivalLocation: {
            type: String,
            required: true
        },
        departureTime: {
            type: Date,
            required: true
        },
        arrivalTime: {
            type: Date,
            required: true
        },
        duration: {
            type: Number,
            required: true
        },
        transit: {
            type: String,
            Enum: ['stop', 'non-stop'],
            required: true
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

const transportations = model('Transportations', transportationSchema)

export default transportations