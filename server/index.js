import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import db from './database/database.js'
import userRoutes from './routes/user.route.js'
import tripRoutes from './routes/trip.route.js'

dotenv.config();

const app = express();

db();

//middleware
app.use(express.json());


const PORT = process.env.PORT || 3000;


app.use(cors({
    origin: '*'
}))

app.use('/api/v1', userRoutes)
app.use('/api/v1', tripRoutes)


app.get('/', (req,res) => res.send("this is homepage for backend server. Hellooooo"))

app.listen(PORT,() => 
{
    console.log("this is backend working seamlessly AT PORT : ", PORT)
})