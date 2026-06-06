import { Schema, model } from 'mongoose';
import { RoleDocument } from '../interface/Role.interface';
import { PermissionPages } from '../interface/Permission.model';

/**
 * @description Schema definition for Role documents.
 * Defines the structure of a role record with the following fields:
 * @type {Schema<RoleDocument>}
 * 
 * @property {string} name - The name of the role.
 * @property {PermissionSchema[]} permissions - The permissions of the role.
 * @property {boolean} isActive - Whether the role is active.
 * @property {boolean} isDelete - Whether the role is deleted.
 * @property {boolean} isDefault - Whether the role is the default role.
 * @property {Date} createdDate - The date the role was created.
 * @property {Date} updatedDate - The date the role was last updated.
 */

const RoleSchema = new Schema<RoleDocument>(
  {
    name: { type: String, required: true },
    permissions: { type: [PermissionPages], required: true },
    isActive: { type: Boolean, required: true },
    isDelete: { type: Boolean, required: true },
    isDefault: { type: Boolean, required: true },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const RoleModel = model<RoleDocument>("Role", RoleSchema);
