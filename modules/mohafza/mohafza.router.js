import { Router } from "express";
import { isValid } from "../../middleware/vaildation.middleware.js"
import { createMohafzaSchema, 
  updateMohafzaSchema, 
  createCitySchema, 
  updateCitySchema, 
  createHallSchema, 
  updateHallSchema,
  idSchema,
  deleteMohafzaSchema,
  deleteCitySchema,
  deleteHallSchema} from './mohafza.validation.js'

import { createMohafza,
  getMohafzas,
  updateMohafza,
  deleteMohafza,
  deleteCity,
  deleteHall,
  createCity,
  updateCity,
  createHall,
  updateHall } from "./mohafza.controller.js"
const router = Router({ mergeParams: true })


// CRUD

// Create mohafza
router.post('/', isValid(createMohafzaSchema), createMohafza)

// update mohafza
router.patch('/:mohafzaId', isValid(updateMohafzaSchema), updateMohafza)

// delete mohafza
router.delete('/:mohafzaId', isValid(deleteMohafzaSchema), deleteMohafza)

// read mohafzat
router.get("/", getMohafzas)


////////////////////////////////////////////////

// Routes for Cities
router.post('/:mohafzaId/cities', isValid(createCitySchema), createCity);

router.patch('/:mohafzaId/cities/:cityId', isValid(updateCitySchema), updateCity);

router.delete('/:mohafzaId/cities/:cityId', isValid(deleteCitySchema), deleteCity);


///////////////////////////////////////////////

// Routes for Halls
router.post('/:mohafzaId/cities/:cityId/halls', isValid(createHallSchema), createHall); // Create a new Hall in a City
router.put('/:mohafzaId/cities/:cityId/halls/:hallId', isValid(updateHallSchema), updateHall); // Update a Hall in a City
router.delete('/:mohafzaId/cities/:cityId/halls/:hallId', isValid(deleteHallSchema), deleteHall); // Delete a Hall from a City


export default router
