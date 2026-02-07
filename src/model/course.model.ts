import { Schema, model, Document } from 'mongoose';
import { CourseDocument } from '../interface/course.interface';


/**
 * @description Schema definition for Course documents.
 * 
 * Defines the structure of a course record with the following fields:
 * @type {Schema<CourseDocument>}
 */
const CourseSchema = new Schema<CourseDocument>(
  {
    name: { type: String, required: true },
    company: { type: String, required: true },
    hours: { type: Number, required: true },
    level: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const CourseModel = model<CourseDocument>("Course", CourseSchema);
