import { Schema, model } from "mongoose"

const agencySchema = new Schema(
    {
        title: {
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
        trips: {
            type: [Schema.Types.ObjectId],
            ref: 'Trips'
        }
    },
    {
        timestamps: true
    }
)

const agencies = model('agencies', agencySchema)

export default agencies