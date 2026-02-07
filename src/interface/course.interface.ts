import { Document } from 'mongoose';

/**
 * @description Represents a course document with training details and certification information.
 * 
 * @interface CourseDocument
 * @extends {Document}
 * 
 * @property {string} name - The name of the course.
 * @property {string} company - The company or organization that provided the course.
 * @property {number} hours - The total number of hours for the course.
 * @property {Date} completedAt - The date when the course was completed.
 * @property {string} [certificateUrl] - Optional URL to the course completion certificate.
 */
export interface CourseDocument extends Document {
  name: string;
  company: string;
  hours: number;
  level: string;
  createdDate?: Date;
  updatedDate?: Date;
}
