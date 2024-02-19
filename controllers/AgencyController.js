import Agency from '../models/Agency.js'
import Trip from '../models/Trip.js'

const agencyController = {
    register: async (req, res) => {
        const { title, email, password, location } = req.body
        const avatar = req.file?.path
        if (!title || !email || !password || !location || !avatar)
            return res.status(400).send('All fields are required!')
        try {
            const existingAgency = await Agency.findOne({ email: email })
            if (existingAgency)
                return res.status(400).json({ Error: 'Wrong Credentials' })
            const hashedPassword = await bcrypt.hash(password, 10)
            const newAgency = new Agency({
                title,
                email,
                password: hashedPassword,
                location,
                avatar
            })
            await newAgency.save()
            const token = jwt.sign({ _id: newAgency._id, name: newAgency.name, email: newAgency.email }, process.env.SECRET_TOKEN, { expiresIn: '24h' })
            res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'None' })
            return res.status(200).json({ Agency: newAgency })
        }
        catch (error) {
            console.log(error)
            return  res.status(500).json({ error: "Internal Server Error" })
          }
    },
    getAllAgencies: async (req, res) => {
        try {
          const allAgencies = await Agency.find()
          return   res.status(200).json({ Agencies: allAgencies })
        } catch (error) {
          return  res.status(500).json({ message: error.message })
        }
      },
      getAgencyById: async (req, res) => {
        const id = req.params.id
        try {
          const agency = await Agency.findById({ _id: id })
          agency ? res.status(200).json({ Agency: agency }) : res.status(404).json({ Message: "Agency not found" })
        } catch (error) {
          return  res.status(500).json({ Error: error.message })
        }
      },
      getAgencyByEmail: async (req, res) => {
        const email = req.body.email
        try {
          const agency = await Agency.findOne({ email: email })
          agency ? res.status(200).json({ Agency: agency }) : res.status(404).json({ Message: "Error occured" })
        } catch (error) {
          return  res.status(500).json({ Error: error.message })
        }
      },
      getAgencyByLocation: async (req, res) => {
        const location = req.body.location
        try {
          const agencies = await Agency.find({ location: location })
          agencies ? res.status(200).json({ Agencies: agencies }) : res.status(404).json({ Message: "Error occured" })
        } catch (error) {
          return  res.status(500).json({ Error: error.message })
        }
      },
      getAgencyByTrip: async (req, res) => {
        const id = req.params.id
        const tripId = req.body.tripId
        try {
            const trip = await Trip.findById({ _id: tripId })
            if (!trip)
                res.status(200).send(`Trip ${tripId} is not valid!`)
            const agency = await Agency.findOne({ _id: id && trip.agency })
            agency ? res.status(200).json({ Agency: agency }) :
                res.status(404).send('Error occured!')
        }
        catch (error) {
            return  res.status(500).json({ Error: error.message })
          }
      },
      updateAgencyById: async (req, res) => {
            const { title, email, oldPassword, password, location } = req.body
            const avatar = req.file?.path
            const id = req.params.id
            try {
                const agency = await Agency.findById({ _id: id })
                if (!agency)
                    return res.status(404).json({ Message: "Agency not found" })
                let isOldPasswordValid = true, oldAvatar = agency.avatar
                if (password)
                    isOldPasswordValid = await bcrypt.compare(oldPassword, user.password)
                if (!isOldPasswordValid)
                    return res.status(401).json({ message: "Invalid old password" })
                const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined
                const editAgency = await Agency.findByIdAndUpdate({ _id: id }, {
                    title,
                    email,
                    password: hashedPassword,
                    location,
                    avatar
                })
                await editAgency.save()
                await fs.unlink(oldAvatar)
                editAgency ? res.status(200).send(`Agency ${id} has been updated successfully!`) :
                    res.status(400).send('Error occured!')
            }
            catch (error) {
                return  res.status(500).json({ message: error.message })
            }
        },
        deleteUserById: async (req, res) => {
            const id = req.params.id
            try {
                const agency = await Agency.findById({ _id: id })
                agency ? await Agency.findByIdAndDelete({ _id: id }) && fs.unlink(agency.avatar) :
                    res.status(404).json({ Message: "Agency not found" })
            }
            catch (error) {
                return  res.status(500).json({ message: error.message })
            }
    }
}

export default agencyController