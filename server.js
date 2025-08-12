import express from 'express';
import propertiesRouter from './routes/properties.js';

const app = express();
app.use(express.json());

app.use('/api/properties', propertiesRouter);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
