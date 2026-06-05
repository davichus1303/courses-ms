import express from 'express';
import dotenv from 'dotenv';
import { connectDatabase } from './config/database';
import courseRoutes from './routes/course.routes';
import companyRoutes from './routes/company.routes';
import roleRoutes from './routes/Role.routes';
import userRoutes from './routes/User.routes';
import authRoutes from './routes/Auth.routes';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectDatabase();
app.use('/courses', courseRoutes);
app.use('/companies', companyRoutes);
app.use('/roles', roleRoutes);
app.use('/users', userRoutes);
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Courses microservice running on port ${PORT}`);
  console.log(`Courses microservice running at http://localhost:${PORT}`);
  console.log('Available routes:');
  console.log('  GET /courses - Get all courses');
  console.log('  GET /companies - Get all companies');
  console.log('  GET /roles - Get all roles');
  console.log('  GET /users - Get all users');
  console.log('  POST /auth/login - Login');
});
