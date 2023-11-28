require('dotenv').config()

const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const path = require('path')

// Config import
const corsOptions = require('./config/cors')
const credentials = require('./middleware/credentials')
const connectDB = require('./config/database')
const errorHandlerMiddleware = require('./middleware/errorHandler')
const authentication = require('./middleware/authentication')

const app = express()
const PORT = process.env.PORT

connectDB()

app.use(authentication) // Credentials
app.use(credentials) // Credentials
app.use(cors(corsOptions)) // CORS
app.use(errorHandlerMiddleware) // default error handler
app.use(express.urlencoded({ extended: false })) // application.x-www-form-urlencoded
app.use(express.json()) // application/json response
app.use(cookieParser()) // middleware for cookies
app.use('/static', express.static(path.join(__dirname, 'public'))) // static files

// routes

app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/place', require('./routes/api/place'))
app.use('/api/feedback', require('./routes/api/feedback'))

app.all('*', (req, res) => {
    res.status(404)

    if (req.accepts('json'))
        res.json({ 'error': '404 Not found' })
    else
        res.type('text').send('404 Not found')
})


mongoose.connection.once('open', () => {
    console.log('DB Connected')
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
})