import { Schema, model } from "mongoose"

const faqSchema = new Schema(
    {
        question: {
            type: String,
            required: true
        },
        answer: {
            type: String,
            required: true
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'Users'
        }
    },
    {
        timestamps: true
    }
)

const faqs = model('Faqs', faqSchema)

export default faqs