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
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
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