import { Schema, model } from "mongoose"

const notificationSchema = new Schema(
    {
        text: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

const notifications = model('notifications', notificationSchema)

export default notifications