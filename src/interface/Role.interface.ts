import { Document } from 'mongoose';

/**
 * @description Interface for Role document
 */
export interface RoleDocument extends Document {
  name: string;
  isActive: boolean;
  isDelete : boolean;
  isDefault: boolean;
  createdDate?: Date;
  updatedDate?: Date;
}
