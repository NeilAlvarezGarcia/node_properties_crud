export function validateInputData(data, isUpdate = false) {
  const errors = [];

  if (!isUpdate || data.title !== undefined) {
    if (!data.title || typeof data.title !== 'string') {
      errors.push('Title is required and must be a string.');
    }
  }

  if (!isUpdate || data.address !== undefined) {
    if (!data.address || typeof data.address !== 'string') {
      errors.push('Address is required and must be a string.');
    }
  }

  if (!isUpdate || data.price !== undefined) {
    if (typeof data.price !== 'number' || data.price <= 0) {
      errors.push('Price must be a positive number.');
    }
  }

  return errors;
}