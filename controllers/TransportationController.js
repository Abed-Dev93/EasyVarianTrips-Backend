import transportations from '../models/Transportation.js'
import Transportation from '../models/Transportation.js'

const transportationController = {
    createTransportation: async (req, res) => {
        const { title, fromLocation, toLocation, departureTime, arrivalTime, transit } = req.body
        transit === 'non-stop' ? toLocation.length === 1 : toLocation.length > 1
        try {
            if (departureTime && arrivalTime && new Date(departureTime).getTime() < new Date(arrivalTime).getTime()) {
                const departureDateTime = new Date(departureTime), arrivalDateTime = new Date(arrivalTime),
                    timeDifference = arrivalDateTime.getTime() - departureDateTime.getTime(), 
                    hours = Math.floor(timeDifference / (1000 *60 *60)), minutes = Math.floor((timeDifference % (1000 *60 * 60)) / (1000 *60))
                const newTranportation = await Transportation.create({
                    title,
                    fromLocation,
                    toLocation,
                    departureTime,
                    arrivalTime,
                    duration: { hours, minutes },
                    transit
                })
                newTranportation ? res.status(200).json({ Transportation: newTranportation }) : 
                    res.status(400).send('Error occured!')
            }
            else
                return res.status(400).json({ Error: 'Invalid departureTime or arrivalTime provided!' })
        }
        catch (error) {
            return  res.status(500).json({ Error: error.message })
        }
    },
    getAllTransportations: async (req, res) => {
        try {
            const allTransportations = await Transportation.find()
            return res.status(200).json({ Transportations: allTransportations })
        }
        catch (error) {
            return  res.status(500).json({ message: error.message })
        }
    },
    getTransportationById: async (req, res) => {
        const id = req.params.id
        try {
            const transportation = await Transportation.findById({ _id: id })
            transportation ? res.status(200).json({ Transportation: transportation }) : res.status(404).json({ Message: "Transportation not found" })
        }
        catch (error) {
            return  res.status(500).json({ message: error.message })
        }
    },
    getTransportationByLocation: async (req, res) => {
        const { fromLocation, toLocation } = req.body
        try {
            if (fromLocation){
                const transportations = await Transportation.find({ fromLocation: fromLocation })
            }
            else if (toLocation) {
                const transportations = await Transportation.find({ toLocation: toLocation })
            }
            else if (fromLocation && toLocation) {
                const transportations = await Transportation.find({ fromLocation: fromLocation, toLocation: toLocation })
            }
        }
        catch (error) {
            return  res.status(500).json({ message: error.message })
        }
    },
    getTransportationByDuration: async (req, res) => {
        const duration = req.body.duration
        try {
            const transportations = await Transportation.find({ duration: duration })
            transportations ? res.status(200).json({ Transportations: transportations }) : res.status(404).json({ Message: "Transportations not found" })
        }
        catch (error) {
            return  res.status(500).json({ message: error.message })
        }
    },
    getTransportationById: async (req, res) => {
        const transit = req.body.transit
        try {
            const transportations = await Transportation.find({ transit: transit })
            transportations ? res.status(200).json({ Transportations: transportations }) : res.status(404).json({ Message: "Transportations not found" })
        }
        catch (error) {
            return  res.status(500).json({ message: error.message })
        }
    },
    updateTransportationById: async (req, res) => {
        const id = req.params.id
        const { title, fromLocation, toLocation, departureTime, arrivalTime, transit } = req.body
        transit === 'non-stop' ? toLocation.length === 1 : toLocation.length > 1
        try {
            if (departureTime && arrivalTime && new Date(departureTime).getTime() < new Date(arrivalTime).getTime()) {
                const departureDateTime = new Date(departureTime), arrivalDateTime = new Date(arrivalTime),
                    timeDifference = arrivalDateTime.getTime() - departureDateTime.getTime(), 
                    hours = Math.floor(timeDifference / (1000 *60 *60)), minutes = Math.floor((timeDifference % (1000 *60 * 60)) / (1000 *60))
                const editTranportation = await Transportation.findByIdAndUpdate({ _id: id }, {
                    title,
                    fromLocation,
                    toLocation,
                    departureTime,
                    arrivalTime,
                    duration: { hours, minutes },
                    transit
                })
                editTranportation ? res.status(200).send(`Transportation ${id} has been updated successfully!`) : 
                    res.status(400).send('Error occured!')
            }
            else
                return res.status(400).json({ Error: 'Invalid departureTime or arrivalTime provided!' })
        }
        catch (error) {
            return  res.status(500).json({ Error: error.message })
        }
    },
    deleteTransportationById: async (req, res) => {
        const id = req.params.id
        try {
            const removeTransportation = Transportation.findByIdAndDelete({ _id: id })
            removeTransportation ? res.status(200).send(`Transportation ${id} has been deleted successfully!`) :
                res.status(400).send('Error occured!')
        }
        catch (error) {
            return  res.status(500).json({ Error: error.message })
          }
    }
}

export default transportationController