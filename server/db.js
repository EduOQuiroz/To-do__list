import mongoose from 'mongoose'
import { mongoDBURI, port } from './config.js';

export async function connectDB(){
    try {
        const db = await mongoose.connect(mongoDBURI)
        console.log('DB Connect: ' + db.connection.name)
    } catch (err) {
        console.error(err)
    }
}

