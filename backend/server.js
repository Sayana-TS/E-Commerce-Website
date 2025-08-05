import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDb from './config/db.js'
import userRoute from './routes/userRoutes.js'
import cookieParser from 'cookie-parser'
import { notFound, errorHandler } from './middlewares/errorMiddlewares.js'
import productRoute from './routes/productRoutes.js'


dotenv.config()

const app = express()

connectDb()

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cookieParser())
app.use(cors())

const port = process.env.PORT


app.use('/api/user', userRoute)
app.use('/api/products', productRoute)

app.use(notFound)
app.use(errorHandler)

app.listen(port, ()=> console.log('Server started successfully'))