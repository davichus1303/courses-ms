import { Document, ObjectId } from 'mongoose';

/**
 * @description Represents a user document with training details and certification information.
 * 
 * @interface UserDocument -  Interface for user documents.
 * @extends {Document}-  Extends the Document interface from Mongoose.
 * @param {string} name - The name of the user.
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @param {ObjectId} companyOId - The company OID of the user.
 * @param {ObjectId} roleOId - The role OID of the user.
 * @param {boolean} isActive - Whether the user is active.
 * @param {boolean} isDelete - Whether the user is deleted.
 * @param {Date} createdDate - The date the user was created.
 * @param {Date} updatedDate - The date the user was updated.
 */
export interface UserDocument extends Document {
  name?: string;
  lastName?: string;
  surName?: string;
  email?: string;
  companyOId?: ObjectId;
  roleOId?: ObjectId;
  isActive?: boolean;
  isDelete?: boolean;
  createdDate?: Date;
  updatedDate?: Date;
}
