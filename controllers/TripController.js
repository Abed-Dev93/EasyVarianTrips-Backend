import Trip from '../models/Trip.js'
import User from '../models/User.js'
import fs from 'fs/promises'

const tripController = {
    createTrip: async (req, res) => {
        const userId = req.user._id
        const { category, type, shortDescription, description, price, capacity, startDate, endDate, fromLocation, toLocation, country, hotel, transit } = req.body
        const files = req.files
        const images = files.map(item => item.path)
        if (!category || !type || !shortDescription || !description || !price || !images || !capacity || !startDate || !endDate || !fromLocation || !toLocation || !country || !hotel || !transit)
            return res.status(400).send('All fields are required!')
        try {
            if (startDate && endDate && new Date(startDate).getTime() < new Date(endDate).getTime()) {
                const startDateTime = new Date(startDate), endDateTime = new Date(endDate),
                    timeDifference = endDateTime.getTime() - startDateTime.getTime(),
                    daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
                const user = await User.findById({ _id: userId })
                const newTrip = await Trip.create({
                    category,
                    type,
                    shortDescription,
                    description,
                    startDate,
                    endDate,
                    fromLocation,
                    toLocation,
                    duration: daysDifference,
                    price,
                    images,
                    capacity,
                    country,
                    hotel,
                    transit
                })
                await newTrip.save()
                user.trips.push(newTrip._id)
                await user.save()
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
        const { offset, limit } = req
        try {
            const allTrips = await Trip.find().skip(offset).limit(limit)
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
    getTripByType: async (req, res) => {
        const type = req.body.type
        try {
            const trips = await Trip.find({ type: type })
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
    getTripByPriceAsc: async (req, res) => {
        const { offset, limit } = req
        try {
            const trips = await Trip.find().sort({ price: 1 }).skip(offset).limit(limit)
            trips ? res.status(200).json({ Trips: trips }) : res.status(404).json({ Message: "Trips not found" })
        }
        catch (error) {
            return  res.status(500).json({ message: error.message })
        }
    },
    getTripByPriceDesc: async (req, res) => {
        const { offset, limit } = req
        try {
            const trips = await Trip.find().sort({ price: -1 }).skip(offset).limit(limit)
            trips ? res.status(200).json({ Trips: trips }) : res.status(404).json({ Message: "Trips not found" })
        }
        catch (error) {
            return  res.status(500).json({ message: error.message })
        }
    },
    getTripByTransit: async (req, res) => {
        const { offset, limit } = req
        try {
            const trips = await Trip.find({ transit: 'non-stop' }).skip(offset).limit(limit)
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
                trips ? res.status(200).json({ Trips: trips }) : res.status(400).json({ Message: "Trips not found" })
            }
            else if (endDate) {
                const trips = await Trip.find({ endDate: endDate })
                trips ? res.status(200).json({ Trips: trips }) : res.status(400).json({ Message: "Trips not found" })
            }
            else if (startDate && endDate) {
                const trips = await Trip.find({ startDate: startDate, endDate: endDate })
                trips ? res.status(200).json({ Trips: trips }) : res.status(400).json({ Message: "Trips not found" })
            }
        }
        catch (error) {
            return  res.status(500).json({ message: error.message })
        }
    },
    getTripFormGuest: async (req, res) => {
        const { fromLocation, toLocation, startDate, maxPrice } = req.body
        if (!fromLocation || !toLocation || !startDate)
                return res.status(400).send('All fields are required!')
        try {
            const trips = await Trip.find({ fromLocation, toLocation, startDate, price: { $lte: maxPrice }})
                trips ? res.status(200).json({ Trips: trips }) : res.status(404).json({ Message: "Trips not found" })
        }
        catch (error) {
            return  res.status(500).json({ message: error.message })
        }
    },
    getTripByUser: async (req, res) => {
        const { offset, limit } = req
        const userId = req.user._id
        try {
            const user = await User.findById({ _id: userId })
            const trips = await Trip.find({ _id: { $in: user.trips } }).skip(offset).limit(limit)
            trips ? res.status(200).json({ Trips: trips }) : res.status(404).json({ Message: "Trips not found" })
        }
        catch (error) {
            return  res.status(500).json({ message: error.message })
        }
    },
    updateTripById: async (req, res) => {
        const id = req.params.id
        const { category, type, shortDescription, description, price, capacity, startDate, endDate, fromLocation, toLocation, country, hotel, transit } = req.body
        const files = req.files
        const images = files.map(item => item.path)
        const trip = await Trip.findById({ _id: id })
        let oldImages = trip.images
        try {
            if (startDate && endDate && new Date(startDate).getTime() < new Date(endDate).getTime()) {
                const startDateTime = new Date(startDate), endDateTime = new Date(endDate),
                    timeDifference = endDateTime.getTime() - startDateTime.getTime(),
                    daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
                const editTrip = await Trip.findByIdAndUpdate({ _id: id }, {
                    category,
                    type,
                    shortDescription,
                    description,
                    startDate,
                    endDate,
                    fromLocation,
                    toLocation,
                    duration: daysDifference,
                    price,
                    images,
                    capacity,
                    country,
                    hotel,
                    transit
                })
                await editTrip.save()
                editTrip ? res.status(200).send(`Trip ${id} has been updated successfully!`) :
                    res.status(400).send('Error occured!')
            }
            else
                return res.status(400).json({ Error: 'Invalid startDate or endDate provided!' })
            }
        catch (error) {
            return  res.status(500).json({ message: error.message })
        }
    },
    deleteTripById: async (req, res) => {
        const id = req.params.id
        try {
            const removeTrip = await Trip.findByIdAndDelete({ _id: id })
            removeTrip ? res.status(200).send(`Trip ${id} has been deleted successfully!`) :
                res.status(400).send('Error occured!')
        }
        catch (error) {
            return  res.status(500).json({ message: error.message })
        }
    }
}

export default tripController