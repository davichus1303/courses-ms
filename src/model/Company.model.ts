import { Schema, model, Document } from 'mongoose';
import { CompanyDocument } from '../interface/Company.interface';

/**
 * @description Schema definition for Company documents.
 * 
 * Defines the structure of a company record with the following fields:
 * @type {Schema<CompanyDocument>}
 */
const CompanySchema = new Schema<CompanyDocument>(
  {
    name: { type: String, required: true },
    description: { type: String, required: false },
    numberEmployees: { type: Number, required: false },
    phone: { type: String, required: false },
    email: { type: String, required: false },
    address: { type: String, required: false },
    website: { type: String, required: false },
    principalContact: { type: String, required: true },
    principalContactPhone: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date, default: Date.now },
    isDeleted: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const CompanyModel = model<CompanyDocument>("Company", CompanySchema);
