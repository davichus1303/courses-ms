import express from 'express';
import dotenv from 'dotenv';
import { connectDatabase } from './config/database';
import courseRoutes from './routes/course.routes';

dotenv.config();

const app = express();
app.use(express.json());

connectDatabase();
app.use('/courses', courseRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Courses microservice running on port ${PORT}`);
});
