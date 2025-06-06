import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URI!)//! means this will resolve always
        const connection= mongoose.connection

        connection.on('connected',()=>{
            console.log('Mongodb connected successfully')
        })
        connection.on('error',(err)=>{
            console.log('Connection error'+err)
            process.exit()
        })
    } catch (error) {
        console.log("Something gone wrong"+error)
    }
}