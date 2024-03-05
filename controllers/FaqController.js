import Faq from '../models/Faq.js'
import User from '../models/User.js'

const faqController = {
    createFaq: async (req, res) => {
        const userId = req.user._id
        const { question, answer } = req.body
        if (!question || !answer)
            return res.status(400).send('All fields are required!')
        try {
            const newFaq = await Faq.create({
                question,
                answer,
                user: userId
            })
            await newFaq.save()
            newFaq ? res.status(200).json({ Faq: newFaq }) :
                res.status(400).send('Error occured!')
        }
        catch (error) {
            return  res.status(500).json({ message: error.message })
        }
    },
    getAllFaqs: async (req, res) => {
        const { offset, limit } = req
        try {
            const faqs = await Faq.find().skip(offset).limit(limit)
            res.status(200).json({ Faqs: faqs })
        }
        catch (error) {
            return  res.status(500).json({ message: error.message })
        }
    },
    updateFaqById: async (req, res) => {
        const id = req.params.id
        const { question, answer } = req.body
        try {
            const editFaq = await Faq.findByIdAndUpdate({ _id: id }, {
                question,
                answer
            })
            await editFaq.save()
            editFaq ? res.status(200).send(`Faq ${id} has been updated successfully!`) : 
                res.status(400).send('Error occured!')
        }
        catch (error) {
            return  res.status(500).json({ message: error.message })
        }
    },
    deleteFaqById: async (req, res) => {
        const id = req.params.id
        try {
            const removeFaq = await Faq.findByIdAndDelete({ _id: id })
            await removeFaq.save()
            removeFaq ? res.status(200).send(`Faq ${id} has been deleted successfully!`) : 
                res.status(400).send('Error occured!')
        }
        catch (error) {
            return  res.status(500).json({ message: error.message })
        }
    }
}

export default faqController