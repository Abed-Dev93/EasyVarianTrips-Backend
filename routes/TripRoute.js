import express from 'express'
import tripController from '../controllers/TripController.js'
import Upload from '../middlewares/Multer.js'
import { verifyToken, checkRole } from '../middlewares/Authentication.js'
import Paginate from '../middlewares/Pagination.js'

const tripRouter = express.Router()

tripRouter.post('/create', verifyToken, checkRole(['agency']), Upload.array('images'), tripController.createTrip)
tripRouter.get('/allTrips', Paginate, tripController.getAllTrips)
tripRouter.get('/:id', tripController.getTripById)
tripRouter.get('/category', verifyToken, Paginate, tripController.getAllTrips)
tripRouter.get('/capacity', verifyToken, Paginate,  checkRole(['admin', 'agency']), tripController.getAllTrips)
tripRouter.get('/duration', verifyToken, Paginate, tripController.getAllTrips)
tripRouter.get('/country', verifyToken, Paginate, tripController.getAllTrips)
tripRouter.get('/price', verifyToken, Paginate, tripController.getAllTrips)
tripRouter.get('/date', Paginate, tripController.getAllTrips)
tripRouter.get('/interests', Paginate, verifyToken, tripController.getAllTrips)
tripRouter.get('/transit', Paginate, tripController.getTripByTransit)
tripRouter.get('/lowToHigh', Paginate, tripController.getTripByPriceAsc)
tripRouter.get('/highToLow', Paginate, tripController.getTripByPriceDesc)
tripRouter.put('/:id', verifyToken, checkRole(['admin', 'agency']), Upload.array('images'), tripController.updateTripById)
tripRouter.delete('/:id', verifyToken, checkRole(['admin', 'agency']), tripController.deleteTripById)

export default tripRouter