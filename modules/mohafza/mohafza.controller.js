import { Mohafza } from './../../../db/models/hall.model.js'
import { 
  createMohafzaSchema, 
  updateMohafzaSchema, 
  idSchema, 
  createCitySchema, 
  updateCitySchema, 
  createHallSchema, 
  updateHallSchema,
  deleteCitySchema,
  deleteHallSchema,
  deleteMohafzaSchema 
} from "./mohafza.validation.js";

// Create a new Mohafza
export const createMohafza = async (req, res) => {
  try {
      const { error } = createMohafzaSchema.validate(req.body);
      if (error) return res.status(400).json({ message: error.details[0].message });

      const newMohafza = new Mohafza(req.body);
      await newMohafza.save();
      res.status(201).json(newMohafza);
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
};

// Get all Mohafzas
export const getMohafzas = async (req, res) => {
  try {
      const mohafzas = await Mohafza.find();
      res.status(200).json(mohafzas);
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
};

// Update a Mohafza by ID
export const updateMohafza = async (req, res) => {
  try {
      const { error } = updateMohafzaSchema.validate(req.body);
      if (error) return res.status(400).json({ message: error.details[0].message });

      const { id } = req.params;
      const updatedMohafza = await Mohafza.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedMohafza) return res.status(404).json({ message: "Mohafza not found" });
      res.status(200).json(updatedMohafza);
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
};

// Delete a Mohafza by ID
export const deleteMohafza = async (req, res) => {
  try {
      const { error } = deleteMohafzaSchema.validate(req.params);
      if (error) return res.status(400).json({ message: error.details[0].message });

      const { id } = req.params;
      const deletedMohafza = await Mohafza.findByIdAndDelete(id);
      if (!deletedMohafza) return res.status(404).json({ message: "Mohafza not found" });
      res.status(200).json({ message: "Mohafza deleted successfully" });
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
};

// Create a new city in a Mohafza
export const createCity = async (req, res) => {
  try {
      const { mohafzaId } = req.params;

      // Validate the mohafzaId
      const { error: idError } = idSchema.validate({ id: mohafzaId });
      if (idError) return res.status(400).json({ message: idError.details[0].message });

      // Validate the city data
      const { error: cityError } = createCitySchema.validate(req.body);
      if (cityError) return res.status(400).json({ message: cityError.details[0].message });

      const mohafza = await Mohafza.findById(mohafzaId);
      if (!mohafza) return res.status(404).json({ message: "Mohafza not found" });

      // Create and push the new city into the mohafza
      const newCity = { ...req.body, halls: [] }; // Initialize halls as an empty array
      mohafza.cities.push(newCity);
      await mohafza.save();

      res.status(201).json(newCity);
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
};

// Update a city in a Mohafza
export const updateCity = async (req, res) => {
  try {
      const { mohafzaId, cityId } = req.params;

      // Validate the IDs
      const { error: mohafzaError } = idSchema.validate({ id: mohafzaId });
      if (mohafzaError) return res.status(400).json({ message: mohafzaError.details[0].message });

      const { error: cityError } = idSchema.validate({ id: cityId });
      if (cityError) return res.status(400).json({ message: cityError.details[0].message });

      // Validate the city update data
      const { error: updateError } = updateCitySchema.validate(req.body);
      if (updateError) return res.status(400).json({ message: updateError.details[0].message });

      const mohafza = await Mohafza.findById(mohafzaId);
      if (!mohafza) return res.status(404).json({ message: "Mohafza not found" });

      const city = mohafza.cities.id(cityId);
      if (!city) return res.status(404).json({ message: "City not found" });

      // Update the city details
      Object.assign(city, req.body);
      await mohafza.save();

      res.status(200).json(city);
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
};

// Create a new hall in a city
export const createHall = async (req, res) => {
  try {
      const { mohafzaId, cityId } = req.params;

      // Validate the IDs
      const { error: mohafzaError } = idSchema.validate({ id: mohafzaId });
      if (mohafzaError) return res.status(400).json({ message: mohafzaError.details[0].message });

      const { error: cityError } = idSchema.validate({ id: cityId });
      if (cityError) return res.status(400).json({ message: cityError.details[0].message });

      // Validate the hall data
      const { error: hallError } = createHallSchema.validate(req.body);
      if (hallError) return res.status(400).json({ message: hallError.details[0].message });

      const mohafza = await Mohafza.findById(mohafzaId);
      if (!mohafza) return res.status(404).json({ message: "Mohafza not found" });

      const city = mohafza.cities.id(cityId);
      if (!city) return res.status(404).json({ message: "City not found" });

      // Create and push the new hall into the city
      const newHall = req.body;
      city.halls.push(newHall);
      await mohafza.save();

      res.status(201).json(newHall);
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
};

// Update a hall in a city
export const updateHall = async (req, res) => {
  try {
      const { mohafzaId, cityId, hallId } = req.params;

      // Validate the IDs
      const { error: mohafzaError } = idSchema.validate({ id: mohafzaId });
      if (mohafzaError) return res.status(400).json({ message: mohafzaError.details[0].message });

      const { error: cityError } = idSchema.validate({ id: cityId });
      if (cityError) return res.status(400).json({ message: cityError.details[0].message });

      const { error: hallError } = idSchema.validate({ id: hallId });
      if (hallError) return res.status(400).json({ message: hallError.details[0].message });

      // Validate the hall update data
      const { error: updateError } = updateHallSchema.validate(req.body);
      if (updateError) return res.status(400).json({ message: updateError.details[0].message });

      const mohafza = await Mohafza.findById(mohafzaId);
      if (!mohafza) return res.status(404).json({ message: "Mohafza not found" });

      const city = mohafza.cities.id(cityId);
      if (!city) return res.status(404).json({ message: "City not found" });

      const hall = city.halls.id(hallId);
      if (!hall) return res.status(404).json({ message: "Hall not found" });

      // Update the hall details
      Object.assign(hall, req.body);
      await mohafza.save();

      res.status(200).json(hall);
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
};

// Delete a city from a Mohafza
export const deleteCity = async (req, res) => {
  try {
      const { mohafzaId, cityId } = req.params;

      // Validate the IDs
      const { error: mohafzaError } = idSchema.validate({ id: mohafzaId });
      if (mohafzaError) return res.status(400).json({ message: mohafzaError.details[0].message });

      const { error: cityError } = idSchema.validate({ id: cityId });
      if (cityError) return res.status(400).json({ message: cityError.details[0].message });

      const mohafza = await Mohafza.findById(mohafzaId);
      if (!mohafza) return res.status(404).json({ message: "Mohafza not found" });

      const city = mohafza.cities.id(cityId);
      if (!city) return res.status(404).json({ message: "City not found" });

      // Remove the city from the mohafza
      mohafza.cities.id(cityId).remove();
      await mohafza.save();

      res.status(200).json({ message: "City deleted successfully" });
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
};

// Delete a hall from a city
export const deleteHall = async (req, res) => {
  try {
      const { mohafzaId, cityId, hallId } = req.params;

      // Validate the IDs
      const { error: mohafzaError } = idSchema.validate({ id: mohafzaId });
      if (mohafzaError) return res.status(400).json({ message: mohafzaError.details[0].message });

      const { error: cityError } = idSchema.validate({ id: cityId });
      if (cityError) return res.status(400).json({ message: cityError.details[0].message });

      const { error: hallError } = idSchema.validate({ id: hallId });
      if (hallError) return res.status(400).json({ message: hallError.details[0].message });

      const mohafza = await Mohafza.findById(mohafzaId);
      if (!mohafza) return res.status(404).json({ message: "Mohafza not found" });

      const city = mohafza.cities.id(cityId);
      if (!city) return res.status(404).json({ message: "City not found" });

      const hall = city.halls.id(hallId);
      if (!hall) return res.status(404).json({ message: "Hall not found" });

      // Remove the hall from the city
      city.halls.id(hallId).remove();
      await mohafza.save();

      res.status(200).json({ message: "Hall deleted successfully" });
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
};