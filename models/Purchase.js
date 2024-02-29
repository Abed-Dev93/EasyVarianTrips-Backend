import { Schema, model } from "mongoose"

const purchaseSchema = new Schema(
    {
        trip: {
            type: Schema.Types.ObjectId,
            ref: 'Trips'
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'Users'
        },
        date: {
            type: Date
        },
        persons: {
            type: Number,
            required: true
        },
        price: {
            type: Number
        }
    },
    {
        timestamps: true
    }
)

const purchases = model('Purchases', purchaseSchema)

export default purchases