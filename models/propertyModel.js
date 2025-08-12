import { v4 as uuidv4 } from 'uuid';

let properties = [];

export function getAllProperties(filter = {}) {
  let results = properties;

  if (filter.status) {
    const statusFilter = filter.status.trim().toLowerCase();
    results = results.filter(
      p => p.status && p.status.toLowerCase() === statusFilter
    );
  }

  if (filter.limit !== undefined && filter.offset !== undefined) {
    results = results.slice(filter.offset, filter.offset + filter.limit);
  }

  return results;
}

export function getPropertyById(id) {
  return properties.find(p => p.id === id);
}

export function createProperty(data) {
  const now = new Date().toISOString();
  const newProperty = {
    id: uuidv4(),
    title: data.title,
    description: data.description,
    address: data.address,
    price: data.price,
    createdAt: now,
    updatedAt: now,
    status: data.status || 'available'
  };
  properties.push(newProperty);
  return newProperty;
}

export function updateProperty(id, updates) {
  const property = getPropertyById(id);
  if (!property) return null;
  Object.assign(property, updates);
  property.updatedAt = new Date().toISOString();
  return property;
}

export function deleteProperty(id) {
  const index = properties.findIndex(p => p.id === id);
  if (index === -1) return false;
  properties.splice(index, 1);
  return true;
}
