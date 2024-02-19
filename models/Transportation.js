import { Schema, model } from "mongoose"

const transportationSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        fromLocation: {
            type: String,
            required: true
        },
        toLocation: {
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
            type: Object,
            required: true
        },
        transit: {
            type: String,
            Enum: ['stop', 'non-stop'],
            required: true
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

const transportations = model('Transportations', transportationSchema)

export default transportations