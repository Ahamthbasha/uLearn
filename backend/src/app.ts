import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db'
import studentRoutes from './routes/studentRoutes'
import instructorRoutes from './routes/instructorRoutes'
import adminRoutes from './routes/adminRoutes'
dotenv.config()

const app = express()
app.use(express.json())

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