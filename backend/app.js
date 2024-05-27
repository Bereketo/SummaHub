const express = require('express');
const app = express()
const cors = require('cors')
app.use(cors())

const helmet = require('helmet')
const mongoSanitizer = require('express-mongo-sanitize')
const xss = require('xss-clean')
const cookieParser = require('cookie-parser')

const morgan = require('morgan')
const AppError = require('./utils/appError')
const globalErrorHandler = require('./controllers/errorController')

const userRouter = require('./routes/userRoutes')
const noteRouter = require('./routes/noteRoutes')

//1) Global Middlewares
//set secure http headers
app.use( helmet({ contentSecurityPolicy: false }) );
//development logging 
if (process.env.NODE_ENV !== 'development') {
    app.use(morgan('dev'))
}
//body parser , reading data from body to req.body 
app.use(express.json({ limit: '10kb' }))
app.use(cookieParser())
//Data sanitization against NoSql query injection
app.use(mongoSanitizer())
//Data sanitization against xss
app.use(xss())
//prevent parameter pollution

//serving static files
//Test middleware

//limiting request from the same API

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString()
    console.log(req.cookies)
    next()
})

//2) Routes
app.get('/', (req, res, next) => {res.send('Welcome from backend ? Yeah am working!😁😀🚀🚀🚀')})
app.use('/api/v1/users', userRouter)
app.use('/api/v1/notes', noteRouter)

app.all('*', (req, res, next) => {
    const err = new Error()
    err.status = 'fail'
    err.statusCode = 404
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
})
app.use(globalErrorHandler)
module.exports = app