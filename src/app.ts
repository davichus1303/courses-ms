import express from 'express';
import dotenv from 'dotenv';
import { connectDatabase } from './config/database';
import courseRoutes from './routes/course.routes';
import companyRoutes from './routes/company.routes';
import roleRoutes from './routes/Role.routes';
import userRoutes from './routes/User.routes';
import authRoutes from './routes/Auth.routes';
import healthRoutes from './routes/Health.routes';
import cors from 'cors';
import { LoggerMiddleware } from './middleware/Logger.middleware';
import { ErrorMiddleware } from './middleware/Error.midleware';

dotenv.config();

const app = express();
const loggerMiddleware = new LoggerMiddleware();
const errorMiddleware = new ErrorMiddleware();

app.use(cors());
app.use(express.json());
app.use(loggerMiddleware.logRequest.bind(loggerMiddleware));

connectDatabase();
app.use('/courses', courseRoutes);
app.use('/companies', companyRoutes);
app.use('/roles', roleRoutes);
app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/health', healthRoutes);

// Error handling middleware must be last
app.use(errorMiddleware.handle.bind(errorMiddleware));
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Courses microservice running on port ${PORT}`);
  console.log(`Courses microservice running at:${PORT}`);
});
