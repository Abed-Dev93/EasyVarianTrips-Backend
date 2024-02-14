import Hotel from '../models/Hotel.js'
import Trip from '../models/Trip.js'
import fs from 'fs/promises'

const hotelController = {
    createHotel: async (req, res) => {
        const { title, location, rank } = req.body
        const files = req.files
        const images = files.map(item => item.path)
        if (!title || !location || !rank || !images)
            return res.status(400).send('All fields are required!')
        try {
            const newHotel = await Hotel.create({
                title,
                location,
                rank,
                images
            })
            newHotel.save()
            newHotel ? res.status(200).json({ Hotel: newHotel }) : res.status(400).send('Error occured!')
        }
        catch (error) {
            return  res.status(500).json({ message: error.message })
        }
    },
    getAllHotels: async (req, res) => {
        try {
            const allHotels = await Hotel.find()
            return   res.status(200).json({ Hotels: allHotels })
        }
        catch (error) {
            return  res.status(500).json({ message: error.message })
        }
    },
    getHotelById: async (req, res) => {
        const id = req.params.id
        try {
        const hotel = await Hotel.findById({ _id: id })
          hotel ? res.status(200).json({ Hotel: hotel }) : res.status(404).json({ Message: "Hotel not found" })
        }
        catch (error) {
            return  res.status(500).json({ message: error.message })
        }
    },
    getHotelByLocation: async (req, res) => {
        const location = req.body.location
        try {
          const hotels = await Hotel.find({ location: location })
          hotels ? res.status(200).json({ Hotels: hotels }) : res.status(404).json({ Message: "Error occured" })
        } catch (error) {
          return  res.status(500).json({ Error: error.message })
        }
    },
    getHotelByTrip: async (req, res) => {
        const tripId = req.body.tripId
        try {
            const trip = await Trip.findById({ _id: tripId })
            if (!trip)
                res.status(200).send(`Trip ${tripId} is not valid!`)
            const hotel = await Hotel.findById({ _id: trip.hotel })
            hotel ? res.status(200).json({ Hotel: hotel }) :
                res.status(404).send('Error occured!')
        }
        catch (error) {
            return  res.status(500).json({ Error: error.message })
          }
      },
      getHotelByRank: async (req, res) => {
        const rank = req.body.rank
        try {
          const hotels = await Hotel.find({ rank: rank })
          hotels ? res.status(200).json({ Hotels: hotels }) : res.status(404).json({ Message: "Error occured" })
        } catch (error) {
          return  res.status(500).json({ Error: error.message })
        }
    },
    updateHotelById: async (req, res) => {
        const id = req.params.id
        const { title, location, rank } = req.body
        const files = req.files
        const images = files.map(item => item.path)
        try {
            const hotel = await Hotel.findById({ _id: id })
            if (!hotel)
                return res.status(404).send(`Hotel ${id} is not found!`)
            const editHotel = await Hotel.findByIdAndUpdate({ _id: id }, {
                title,
                location,
                rank,
                images
            })
            for (oldImagesPath of hotel.images)
                await fs.unlink(oldImagesPath)
            await editHotel.save()
            editHotel ? res.status(200).send(`Hotel ${id} has been updated successfully!`) :
                res.status(400).send(`Error occured!`)
        }
        catch (error) {
            return  res.status(500).json({ Error: error.message })
          }
    },
    deleteHotelById: async (req, res) => {
        const id = req.params.id
        try {
            const hotel = await Hotel.findById({ _id: id })
            const removeHotel = await Hotel.findByIdAndDelete({ _id: id })
            for (oldImagesPath of hotel.images)
                await fs.unlink(oldImagesPath)
            removeHotel ? res.status(200).send(`Hotel ${id} has been deleted successfully!`) :
                res.status(400).send(`Error occured!`)
        }
        catch (error) {
            return  res.status(500).json({ Error: error.message })
          }
    }
}

export default hotelController