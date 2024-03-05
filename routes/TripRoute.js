import express from 'express'
import tripController from '../controllers/TripController.js'
import Upload from '../middlewares/Multer.js'
import { verifyToken, checkRole } from '../middlewares/Authentication.js'
import Paginate from '../middlewares/Pagination.js'

const tripRouter = express.Router()

tripRouter.post('/create', verifyToken, checkRole(['agency']), Upload.array('images'), tripController.createTrip)
tripRouter.get('/allTrips', Paginate, tripController.getAllTrips)
// tripRouter.get('/:id', tripController.getTripById)
tripRouter.get('/transit', Paginate, tripController.getTripByTransit)
tripRouter.get('/lowToHigh', Paginate, tripController.getTripByPriceAsc)
tripRouter.get('/highToLow', Paginate, tripController.getTripByPriceDesc)
tripRouter.get('/byUser/:id', verifyToken, checkRole(['agency']), Paginate, tripController.getTripByUser)
tripRouter.get('/filtered', tripController.getTripFormGuest)
tripRouter.put('/:id', verifyToken, checkRole(['admin', 'agency']), Upload.array('images'), tripController.updateTripById)
tripRouter.delete('/:id', verifyToken, checkRole(['admin', 'agency']), tripController.deleteTripById)

export default tripRouter