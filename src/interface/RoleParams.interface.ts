/**
 * @description Interface for Role parameters
 */
export interface RoleParams {
  _id?: string;
  name?: string | { $ne: string };
  isDelete?: boolean;
  isActive?: boolean;
}
