import { validateInputData } from '../helpers/validateInputData.js';
import {
  getAllProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty
} from '../models/propertyModel.js';

export function createPropertyHandler(req, res) {
  const errors = validateInputData(req.body);
  if (errors.length) return res.status(400).json({ errors });

  const newProperty = createProperty(req.body);
  res.status(201).json(newProperty);
}

export function getAllPropertiesHandler(req, res) {
  let limit, offset;

  if (req.query.limit !== undefined) {
    limit = parseInt(req.query.limit, 10);
    if (isNaN(limit) || limit <= 0) {
      return res.status(400).json({ error: 'limit must be a positive integer.' });
    }
  }

  if (req.query.offset !== undefined) {
    offset = parseInt(req.query.offset, 10);
    if (isNaN(offset) || offset < 0) {
      return res.status(400).json({ error: 'offset must be a non-negative integer.' });
    }
  }

  const filter = {
    status: req.query.status,
    limit,
    offset
  };

  const properties = getAllProperties(filter);
  res.json({
    total: properties.length,
    data: properties
  });
}

export function getPropertyByIdHandler(req, res) {
  const property = getPropertyById(req.params.id);
  if (!property) return res.status(404).json({ error: 'Property not found.' });
  res.json(property);
}

export function updatePropertyHandler(req, res) {
  const errors = validateInputData(req.body, true);
  if (errors.length) return res.status(400).json({ errors });

  const updated = updateProperty(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: 'Property not found.' });
  res.json(updated);
}

export function deletePropertyHandler(req, res) {
  const success = deleteProperty(req.params.id);
  if (!success) return res.status(404).json({ error: 'Property not found.' });
  res.json({ message: 'Property deleted successfully.' });
}
