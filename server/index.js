import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config();

const app = express();

//middleware
app.use(express.json());


const PORT = process.env.PORT || 3000;


app.use(cors({
    origin: '*'
}))


app.get('/', (req,res) => res.send("this is homepage for backend server. Hellooooo"))

app.listen(PORT,() => 
{
    console.log("this is backend working seamlessly AT PORT : ", PORT)
})