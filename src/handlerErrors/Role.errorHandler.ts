import { RoleDocument } from "../interface/Role.interface";
import { DetailsErrors } from "../interface/error.interface";
import { ROLE_ISSUES } from "../constants/Role.constants";

/**
 * @class RoleErrorHandler
 * @description Handles the errors of a role object and returns an array of details errors if any.
 */
export class RoleErrorHandler {

  /**
   * @description Handles the errors of a role object and returns an array of details errors if any.
   * @param {RoleDocument} roles - The role object to handle errors from.
   * @returns An array of details errors if any, or null if no errors found.
   */
  public handleRoleErrors(roles: RoleDocument[]): DetailsErrors[] | null {
    const caughtErrors: DetailsErrors[] = [];
    const fieldsErrors: DetailsErrors[] = [];
    const typeErrors: DetailsErrors[] = [];
    const uniqueErrors: DetailsErrors[] = [];

    roles.forEach(roleElement => {
      const fieldsError = this.verifyRoleFields(roleElement);
      const typeError = this.verifyTypeOfFields(roleElement);
      const uniqueError = this.isRolesUniqueInList(roles, roleElement);

      if (fieldsError && fieldsError.length > 0) {
        fieldsErrors.push(...fieldsError);
      }
      
      if (typeError && typeError.length > 0) {
        typeErrors.push(...typeError);
      }

      if (uniqueError && uniqueError.length > 0) {
        uniqueErrors.push(...uniqueError);
      }
    });

    if (fieldsErrors && fieldsErrors.length > 0) {
      caughtErrors.push(...fieldsErrors);
    }
    
    if (typeErrors && typeErrors.length > 0) {
      caughtErrors.push(...typeErrors);
    }
    
    if (uniqueErrors && uniqueErrors.length > 0) {
      caughtErrors.push(...uniqueErrors);
    }

    return caughtErrors;
  }

  /**
   * @description Verifies if the roles in a list are unique by name and returns an array of details errors if any.
   * @param {RoleDocument[]} roles - The list of roles to verify.
   * @returns An array of details errors if any, or null if no errors found.
   */
  private isRolesUniqueInList(roles: RoleDocument[], roleItem: RoleDocument): DetailsErrors[] | null {
    const caughtDetailsErrors: DetailsErrors[] = [];
    const hasDuplicate = roles.some(role => role.name === roleItem.name);
    if (hasDuplicate) {
      caughtDetailsErrors.push({
        field: ROLE_ISSUES.ROLE_NAME_FIELD,
        issue: ROLE_ISSUES.ROLE_NAME_DUPLICATE_MESSAGE,
        value: roleItem.name,
      });
    }
    return caughtDetailsErrors.length > 0 ? caughtDetailsErrors : null;
  }

  /**
   * @description Verifies the types of the fields of a role object and returns an array of details errors if any.
   * @param {RoleDocument} roleObject - The role object to verify.
   * @returns An array of details errors if any, or null if no errors found.
   */

  private verifyTypeOfFields(roleObject: RoleDocument): DetailsErrors[] | null {
    const caughtDetailsErrors: DetailsErrors[] = [];
    
    if (typeof roleObject.name !=='string') {
      caughtDetailsErrors.push({
        field: ROLE_ISSUES.ROLE_NAME_FIELD,
        issue: ROLE_ISSUES.ROLE_NAME_INVALID_MESSAGE,
        value: roleObject.name,
      });
    }

    return caughtDetailsErrors;
  }
  
  /**
   * @description Verifies the fields of a role object and returns an array of details errors if any.
   * @param {RoleDocument} roleObject - The role object to verify.
   * @returns An array of details errors if any, or null if no errors found.
   */
  private verifyRoleFields(roleObject: RoleDocument): DetailsErrors[] | null {
    const caughtDetailsErrors: DetailsErrors[] = [];
    
    if (!roleObject.name) {
      caughtDetailsErrors.push({
        field: ROLE_ISSUES.ROLE_NAME_FIELD,
        issue: ROLE_ISSUES.ROLE_NAME_REQUIRED_MESSAGE,
        value: roleObject?.name,
      });
    }
    
    return caughtDetailsErrors;
  }
}
