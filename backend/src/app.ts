import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db'

dotenv.config()

const app = express()
const port:number = Number(process.env.PORT)

const start = async()=>{
    await connectDB()
    app.listen(port,()=>{
        console.log("server is running")
    })
}

start()