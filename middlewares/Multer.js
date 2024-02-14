import multer from "multer"
import path from 'path'
import fs from 'fs'

const uploadDir = 'images'
if (!fs.existsSync(uploadDir))
    fs.mkdirSync(uploadDir)

const storate = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        let ext = path.extname(file.originalname)
        cb(null, Date.now() + ext)
    }
})

const upload = multer({
    storage: storate,
    fileFilter: (req, file, cb) => {
        file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/svg' ?
            cb(null, true) : console.log('Only JPG, PNG and SVG are supported!') && cb(null, false)
    },
    limits: {
        fileSize: 1024 * 2024 * 2
    }
})

export default upload