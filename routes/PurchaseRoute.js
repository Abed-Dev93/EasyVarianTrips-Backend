import express from 'express'
import purchaseController from '../controllers/PurchaseController.js'
import { verifyToken, checkRole } from '../middlewares/Authentication.js'

const purchaseRouter = express.Router()

purchaseRouter.post('/create/:id', verifyToken, checkRole(['user']), purchaseController.createPurchase)
purchaseRouter.get('/allPurchases', verifyToken, checkRole(['admin', 'agency']), purchaseController.getAllPurchases)
purchaseRouter.get('/:id', verifyToken, purchaseController.getPurchaseById)
purchaseRouter.get('/date', verifyToken, checkRole(['admin', 'agency']), purchaseController.getPurchaseByDate)
purchaseRouter.get('/tripId', verifyToken, checkRole(['admin', 'agency']), purchaseController.getPurchaseByTrip)
purchaseRouter.get('/userId', verifyToken, checkRole(['admin', 'agency']), purchaseController.getPurchaseByUser)
purchaseRouter.put(':id', verifyToken, checkRole(['user']), purchaseController.updatePurchaseById)
purchaseRouter.delete('/:id', verifyToken, checkRole(['user']), purchaseController.deletePurchaseById)

export default purchaseRouter