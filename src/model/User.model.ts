import { Schema, model, Document } from 'mongoose';
import { UserDocument } from '../interface/User.interface';

/**
 * @description Schema definition for User documents.
 * 
 * Defines the structure of a user record with the following fields:
 * @type {Schema<UserDocument>}
 */
const UserSchema: Schema<UserDocument> = new Schema<UserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    companyOId: { type: String, required: true },
    roleOId: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const UserModel = model<UserDocument>("User", UserSchema);
