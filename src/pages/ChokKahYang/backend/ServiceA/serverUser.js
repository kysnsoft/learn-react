const express = require('express')
const mongoose = require('mongoose')

require('dotenv').config({ path: './config.env' })

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

mongoose.connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
}).catch(err => {
    console.log(`User DB Error: ${err.message}`)
})

mongoose.connection.once('open', () => {
    console.log("MongoDB database (User) connection established successfully")
})
/////
const usersRouter = require('./routes/users')
app.use('/api/users', usersRouter)


app.listen(port, () => {
    console.log(`User HTTP server is running on port: ${port}`)
})



