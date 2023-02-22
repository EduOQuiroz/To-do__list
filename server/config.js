import dotenv from 'dotenv';
dotenv.config();

export const mongoDBURI = process.env.MONGODB_URI
export const port = process.env.PORT