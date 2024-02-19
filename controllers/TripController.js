import Trip from '../models/Trip.js'
import User from '../models/User.js'
import Agency from '../models/Agency.js'
import Transportation from '../models/Transportation.js'
import Hotel from '../models/Hotel.js'

const tripController = {
    createTrip: async (req, res) => {
        const id = req.params.id
        const { title, interests, category, price, capacity, startDate, endDate, country, transportation, hotel } = req.body
        const files = req.files
        const images = files.map(item => item.path)
        if (!title || !interests || !category || !price || !capacity || !startDate || !endDate || !country || !transportation || !hotel)
        return res.status(400).send('All fields are required!')
        try {
            if (startDate && endDate && new Date(startDate).getTime() < new Date(endDate).getTime()) {
                const startDateTime = new Date(startDate), endDateTime = new Date(endDate),
                    timeDifference = endDateTime.getTime() - startDateTime.getTime(),
                    daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
                const agency = await Agency.findById({ _id: id })
                const transportation = await Transportation.findById({ _id: })
                const hotel = await Hotel.findById({ _id: })
                const newTrip = await Trip.create({
                    title,
                    category,
                    interests,
                    startDate,
                    endDate,
                    duration: daysDifference,
                    price,
                    images,
                    capacity,
                    reservedPlaces: 0,
                    country,
                    purchaseDate: new Date(),
                    transportation,
                    hotel
                })
                await newTrip.save()
                agency.trips.push(newTrip._id)
                newTrip ? res.status(200).json({ Trip: newTrip }) :
                    res.status(400).send('Error occured!')
            }
            else
                return res.status(400).json({ Error: 'Invalid startDate or endDate provided!' })
            }
        catch (error) {
            return  res.status(500).json({ message: error.message })
        }
    },
    getAllTrips: async (req, res) => {
        try {
            const allTrips = await Trip.find()
            return res.status(200).json({ Trips: allTrips })
        }
        catch (error) {
            return  res.status(500).json({ message: error.message })
        }
    },
    getTripById: async (req, res) => {
        const id = req.params.id
        try {
            const trip = await Trip.findById({ _id: id })
            trip ? res.status(200).json({ Trip: trip }) : res.status(404).json({ Message: "Trip not found" })
        }
        catch (error) {
            return  res.status(500).json({ message: error.message })
        }
    },
    getTripByCategory: async (req, res) => {
        const category = req.body.category
        try {
            const trips = await Trip.find({ category: category })
            trips ? res.status(200).json({ Trips: trips }) : res.status(404).json({ Message: "Trips not found" })
        }
        catch (error) {
            return  res.status(500).json({ message: error.message })
        }
    },
    getTripByCapacity: async (req, res) => {
        const capacity = req.body.capacity
        try {
            const trips = await Trip.find({ capacity: capacity })
            trips ? res.status(200).json({ Trips: trips }) : res.status(404).json({ Message: "Trips not found" })
        }
        catch (error) {
            return  res.status(500).json({ message: error.message })
        }
    },
    getTripByDuration: async (req, res) => {
        const duration = req.body.duration
        try {
            const trips = await Trip.find({ duration: duration })
            trips ? res.status(200).json({ Trips: trips }) : res.status(404).json({ Message: "Trips not found" })
        }
        catch (error) {
            return  res.status(500).json({ message: error.message })
        }
    },
    getTripByCountry: async (req, res) => {
        const country = req.body.country
        try {
            const trips = await Trip.find({ country: country })
            trips ? res.status(200).json({ Trips: trips }) : res.status(404).json({ Message: "Trips not found" })
        }
        catch (error) {
            return  res.status(500).json({ message: error.message })
        }
    },
    getTripByPrice: async (req, res) => {
        const price = req.body.price
        try {
            const trips = await Trip.find({ price: price })
            trips ? res.status(200).json({ Trips: trips }) : res.status(404).json({ Message: "Trips not found" })
        }
        catch (error) {
            return  res.status(500).json({ message: error.message })
        }
    },
    getTripByPurchaseDate: async (req, res) => {
        const purchaseDate = req.body.purchaseDate
        try {
            const trips = await Trip.find({ purchaseDate: purchaseDate })
            trips ? res.status(200).json({ Trips: trips }) : res.status(404).json({ Message: "Trips not found" })
        }
        catch (error) {
            return  res.status(500).json({ message: error.message })
        }
    },
    getTripByDate: async (req, res) => {
        const { startDate, endDate } = req.body
        try {
            if (startDate){
                const trips = await Trip.find({ startDate: startDate })
            }
            else if (endDate) {
                const trips = await Trip.find({ endDate: endDate })
            }
            else if (startDate && endDate) {
                const trips = await Trip.find({ startDate: startDate, endDate: endDate })
            }
        }
        catch (error) {
            return  res.status(500).json({ message: error.message })
        }
    },
    getTripByInterests: async (req, res) => {
        const interests = req.body.interests
        try {
            const trips = await Trip.find({ interests: JSON.stringify(interests) })
            trips ? res.status(200).json({ Trips: trips }) : res.status(404).json({ Message: "Trips not found" })
        }
        catch (error) {
            return  res.status(500).json({ message: error.message })
        }
    },
}