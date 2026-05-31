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
    lastName: { type: String, required: true },
    surName: { type: String, required: false },
    email: { type: String, required: true },
    companyOId: { type: Schema.Types.ObjectId, required: true },
    roleOId: { type: Schema.Types.ObjectId, required: true },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true },
    isDelete: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const UserModel = model<UserDocument>("User", UserSchema);

