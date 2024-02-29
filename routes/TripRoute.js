import express from 'express'
import tripController from '../controllers/TripController.js'
import Upload from '../middlewares/Multer.js'
import { verifyToken, checkRole } from '../middlewares/Authentication.js'

const tripRouter = express.Router()

tripRouter.post('/create', verifyToken, checkRole(['agency']), Upload.array('images'), tripController.createTrip)
tripRouter.get('/allTrips', tripController.getAllTrips)
tripRouter.get('/:id', tripController.getTripById)
tripRouter.get('/category', verifyToken, tripController.getAllTrips)
tripRouter.get('/capacity', verifyToken, checkRole(['admin', 'agency']), tripController.getAllTrips)
tripRouter.get('/duration', verifyToken, tripController.getAllTrips)
tripRouter.get('/country', verifyToken, tripController.getAllTrips)
tripRouter.get('/price', verifyToken, tripController.getAllTrips)
tripRouter.get('/date', tripController.getAllTrips)
tripRouter.get('/interests', verifyToken, tripController.getAllTrips)
tripRouter.put('/:id', verifyToken, checkRole(['admin', 'agency']), Upload.array('images'), tripController.updateTripById)
tripRouter.delete('/:id', verifyToken, checkRole(['admin', 'agency']), tripController.deleteTripById)

export default tripRouter