import Purchase from "../models/Purchase.js"
import User from '../models/User.js'
import Trip from '../models/Trip.js'

const purchaseController = {
    createPurchase: async (req, res) => {
        const id = req.params.id
        const { tripId, persons } = req.body
        if (!persons)
            return res.status(400).send('All fields are required!')
        try {
            const user = await User.findById({ _id: id })
            const trip = await Trip.findById({ _id: tripId })
            const newPurchase = await Purchase.create({
                trip: tripId,
                user: id,
                date: new Date(),
                persons,
                price: persons * trip.price
            })
            await newPurchase.save()
            trip.users.push(user._id)
            newPurchase ? res.status(200).json({ Purchase: newPurchase }) :
                res.status(400).send('Error occured!')
        }
        catch (error) {
            return  res.status(500).json({ message: error.message })
        }
    },
    getAllPurchases: async (req, res) => {
        try {
            const allPurchases = await Purchase.find()
            return res.status(200).json({ Purchases: allPurchases })
        }
        catch (error) {
            return  res.status(500).json({ message: error.message })
        }
    },
    getPurchaseById: async (req, res) => {
        const id = req.params.id
        try {
            const purchase = await Purchase.findById({ _id: id })
            purchase ? res.status(200).json({ Purchase: purchase }) :
                res.status(404).json({ Message: "Purchase not found" })
        }
        catch (error) {
            return  res.status(500).json({ message: error.message })
        }
    },
    getPurchaseByTrip: async (req, res) => {
        const tripId = req.body.tripId
        try {
            const purchases = await Purchase.find({ trip: tripId })
            purchases ? res.status(200).json({ Purchases: purchases }) :
                res.status(404).json({ Message: "Purchases not found" })
        }
        catch (error) {
            return  res.status(500).json({ message: error.message })
        }
    },
    getPurchaseByUser: async (req, res) => {
        const userId= req.body.userId
        try {
            const purchases = await Purchase.find({ user: userId})
            purchases ? res.status(200).json({ Purchases: purchases }) :
                res.status(404).json({ Message: "Purchases not found" })
        }
        catch (error) {
            return  res.status(500).json({ message: error.message })
        }
    },
    getPurchaseByDate: async (req, res) => {
        const date = req.body.date
        try {
            const purchases = await Purchase.find({ date: date })
            purchases ? res.status(200).json({ Purchases: purchases }) :
                res.status(404).json({ Message: "Purchases not found" })
        }
        catch (error) {
            return  res.status(500).json({ message: error.message })
        }
    },
    updatePurchaseById: async (req, res) => {
        const id = req.params.id
        const { persons, tripId }= req.body.persons
        try {
            const trip = await Trip.findById({ _id: tripId })
            const editPurchase = await Purchase.findByIdAndUpdate({ _id: id }, { persons, price: trip.price * persons })
            await editPurchase.save()
            editPurchase ? res.status(200).send(`Purchase ${id} has been updated successfully!`) : 
                res.status(400).send('Error occured!')
        }
        catch (error) {
            return  res.status(500).json({ message: error.message })
        }
    },
    deletePurchaseById: async (req, res) => {
        const id = req.params.id
        try {
            const removePurchase = await Purchase.findByIdAndDelete({ _id: id })
            await removePurchase.save()
            removePurchase ? res.status(200).send(`Purchase ${id} has been deleted successfully!`) : 
                res.status(400).send('Error occured!')
        }
        catch (error) {
            return  res.status(500).json({ message: error.message })
        }
    }
}

export default purchaseController