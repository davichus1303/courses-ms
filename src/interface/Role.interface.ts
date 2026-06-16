import { Document } from 'mongoose';
import { PermissionPages } from './PermissionPages.interface';

/**
 * @description Interface for Role document
 */
export interface RoleDocument extends Document {
  name: string;
  permissions?: Array<PermissionPages>;
  isActive?: boolean;
  isDelete?: boolean;
  isDefault?: boolean;
  createdDate?: Date;
  updatedDate?: Date;
}
