// import express from 'express'
// import dotenv from 'dotenv'
// import mongoose from "mongoose";
// import cors from 'cors'
// import { hall } from "./db/models/hall.model.js"

// dotenv.config()
// const app = express()
// const port = process.env.PORT || 3000

// app.use(cors())

// app.use(express.json());

// mongoose.connect('mongodb://localhost:27017/weddingapp', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

// const connection = mongoose.connection;
// connection.once('open', () => {
//   console.log("MongoDB database connection established successfully");
// })

// //  Routing  >> APIS


// // Get all wedding halls
// app.get('/halls', (req, res) => {
//   hall.find()
//     .then(halls => res.json(halls))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

// app.listen(port, () => console.log(`Example app listening on port ${port}!`))  


import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './db/connection.js'
import { appRouter } from './src/app.router.js'
// import mongoose from 'mongoose'
dotenv.config()
const app = express()
const port = process.env.PORT



// DB 
connectDB()
appRouter(app, express)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))  