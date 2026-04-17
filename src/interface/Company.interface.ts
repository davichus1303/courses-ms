import { Document } from 'mongoose';

/**
 * @description Represents a course document with training details and certification information.
 * 
 * @interface CompanyDocument
 * @extends {Document}
 * 
 * @property {string} name - The name of the company.
 * @property {string} description - The description of the company.
 * @property {number} numberEmployees - The number of employees in the company.
 * @property {string} phone - The phone number of the company.
 * @property {string} email - The email of the company.
 * @property {string} address - The address of the company.
 * @property {string} website - The website of the company.
 * @property {string} principalContact - The principal contact of the company.
 * @property {string} principalContactPhone - The principal contact phone of the company.
 * @property {ObjectId} adminUserOId - The ID of the admin user.
 * @property {Date} createdDate - The date when the company was created.
 * @property {Date} updatedDate - The date when the company was last updated.
 * @property {boolean} isDeleted - Whether the company is deleted.
 * @property {boolean} isActive - Whether the company is active.
 */
export interface CompanyDocument extends Document {
  name: string;
  description: string;
  numberEmployees: number;
  phone: string;
  email: string;
  address: string;
  website: string;
  principalContact: string;
  principalContactPhone: string;
  createdDate?: Date;
  updatedDate?: Date;
  isDeleted?: boolean;
  isActive?: boolean;
}
