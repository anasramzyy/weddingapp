import joi from 'joi'


// create and update hall

// Hall validation schema for creation
const createHallSchema = joi.object({
  name: joi.string().required(),
  pictureLink: joi.array().items(joi.string().uri()).default([]),
  facebook: joi.array().items(joi.string().uri()).default([]),
  instagram: joi.array().items(joi.string().uri()).default([]),
  whatsapp: joi.array().items(joi.string().uri()).default([]),
  location: joi.array().items(joi.string()).default([])
});

// Hall validation schema for updates (optional fields)
const updateHallSchema = joi.object({
  name: joi.string(),
  pictureLink: joi.array().items(joi.string().uri()).default([]),
  facebook: joi.array().items(joi.string().uri()).default([]),
  instagram: joi.array().items(joi.string().uri()).default([]),
  whatsapp: joi.array().items(joi.string().uri()).default([]),
  location: joi.array().items(joi.string()).default([])
});


// create and update city schema

// City validation schema for creation
const createCitySchema = joi.object({
  name: joi.string().required(),
  halls: joi.array().items(createHallSchema).default([])
});

// City validation schema for updates (optional fields)
const updateCitySchema = joi.object({
  name: joi.string(),
  halls: joi.array().items(updateHallSchema).default([])
});


// create and update mohafza schema

// Mohafza validation schema for creation
const createMohafzaSchema = joi.object({
  mohafza: joi.string().required(),
  cities: joi.array().items(createCitySchema).default([])
});

// Mohafza validation schema for updates (optional fields)
const updateMohafzaSchema = joi.object({
  mohafza: joi.string(),
  cities: joi.array().items(updateCitySchema).default([])
});



// ID validation schema
const idSchema = joi.object({
  id: joi.string().length(24).hex().required() // Assuming MongoDB ObjectId format
});



// Delete validation schemas
const deleteMohafzaSchema = idSchema; // Reusing ID schema for deleting a Mohafza
const deleteCitySchema = joi.object({
    mohafzaId: idSchema, // Validate the Mohafza ID
    cityId: idSchema // Validate the City ID
});
const deleteHallSchema = joi.object({
    mohafzaId: idSchema, // Validate the Mohafza ID
    cityId: idSchema, // Validate the City ID
    hallId: idSchema // Validate the Hall ID
});

// Export the validation schemas
export { 
  createMohafzaSchema, 
  updateMohafzaSchema, 
  createCitySchema, 
  updateCitySchema, 
  createHallSchema, 
  updateHallSchema,
  idSchema,
  deleteMohafzaSchema,
  deleteCitySchema,
  deleteHallSchema
};