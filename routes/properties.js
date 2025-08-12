import { Router } from 'express';
import {
  createPropertyHandler,
  getAllPropertiesHandler,
  getPropertyByIdHandler,
  updatePropertyHandler,
  deletePropertyHandler
} from '../controllers/propertiesController.js';

const router = Router();

router.post('/', createPropertyHandler);
router.get('/', getAllPropertiesHandler);
router.get('/:id', getPropertyByIdHandler);
router.put('/:id', updatePropertyHandler);
router.delete('/:id', deletePropertyHandler);

export default router;
