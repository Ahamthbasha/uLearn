import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import studentRoutes from './routes/studentRoutes'
import instructorRoutes from './routes/instructorRoutes'
import adminRoutes from './routes/adminRoutes'
dotenv.config()

const app = express()
const corsOptions = {
    credentials:true,
    origin:String(process.env.FRONTEND_URL),
    methods:"GET,POST,PUT,PATCH,DELETE,HEAD"
}



app.use(cookieParser())
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/api/student",studentRoutes)
app.use("/api/instructor",instructorRoutes)
app.use("/api/admin",adminRoutes)

const port:number = Number(process.env.PORT)

const start = async()=>{
    await connectDB()
    app.listen(port,()=>{
        console.log("server is running")
    })
}

start()