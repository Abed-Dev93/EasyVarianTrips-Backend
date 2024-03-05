import express from 'express'
import faqController from '../controllers/FaqController.js'
import { verifyToken, checkRole } from '../middlewares/Authentication.js'
import Paginate from '../middlewares/Pagination.js'

const faqRouter = express.Router()

faqRouter.post('/create', verifyToken, checkRole(['admin']), faqController.createFaq)
faqRouter.get('/allFaqs', Paginate, faqController.getAllFaqs)
faqRouter.put('/:id', verifyToken, checkRole(['admin']), faqController.updateFaqById)
faqRouter.delete('/:id', verifyToken, checkRole(['admin']), faqController.deleteFaqById)

export default faqRouter