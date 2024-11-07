import mongoose, { model, Schema, Types } from "mongoose"

// Define the hall schema
export const hallSchema = new Schema({
    
    name: { type: String, required: true },
    pictureLink: { type: [String]},
    facebook: { type: [String]},
    instagram: { type: [String]},
    whatsapp: { type: [String]}, // https://wa.me/<number here>
    location: { type: [String]}
}, { _id: false }); 

// Define the city schema
const citySchema = new Schema({
    name: { type: String, required: true, enum: [] }, 
    halls: [hallSchema]
}, { _id: false }); 

// Define the mohafza schema
const mohafzaSchema = new Schema({
    mohafza: { type: String, required: true, enum: [] },
    cities: [citySchema]
}, { timestamps: true });

// model
export const Mohafza = mongoose.Mohafza || model("mohafza", mohafzaSchema)
