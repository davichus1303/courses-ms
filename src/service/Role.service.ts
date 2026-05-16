import { RoleRepository } from '../repository/Role.repository';
import { RoleDocument } from '../interface/Role.interface';
import { RoleErrorHandler } from '../handlerErrors/Role.errorHandler';
import { RoleParams } from '../interface/RoleParams.interface';
import { DetailsErrors, ErrorResponse } from '../interface/error.interface';
import { ROLE_ISSUES, ROLE_ERRORS_STATUS_CODES } from '../constants/Role.constants';

/**
 * @description Service class for managing role operations.
 */
export class RoleService {
  private readonly roleRepository = new RoleRepository();
  private readonly roleErrorHandler = new RoleErrorHandler();

  /**
   * @description Creates a new role document in the database.
   * @param roles - The role document to create.
   * @returns A promise that resolves to the created role document.
   */
  public async createRole(roles: RoleDocument[]): Promise<RoleDocument[]> {
    try {
      const caughtErrors: DetailsErrors[] | null = this.roleErrorHandler.handleRoleErrors(roles);

      if (caughtErrors && caughtErrors.length > 0) {
        const errorResponse: ErrorResponse = {
          status: 400,
          message: ROLE_ISSUES.VALIDATION_FAILED,
          details: caughtErrors,
        };
        throw errorResponse;
      }

      return this.roleRepository.create(roles);
    } catch (error) {
      const errorResponse: ErrorResponse = {
        status: ROLE_ERRORS_STATUS_CODES.VALIDATION_FAILED,
        message: (error as Error).message,
        details: [],
      };

      throw errorResponse;
    }
  }

  /**
   * @description Deletes a role document by its ID.
   * @param {string} id - The ID of the role to delete.
   * @returns A promise that resolves to the deleted role document.
   */
  public async deleteById(id: string): Promise<RoleDocument> {
    try {
      const deletedRole: RoleDocument | null = await this.roleRepository.findOneById(id);

      if (!deletedRole) {
        const errorResponse: ErrorResponse = {
          status: ROLE_ERRORS_STATUS_CODES.ROLE_NOT_FOUND,
          message: ROLE_ISSUES.ROLE_NOT_FOUND,
          details: [],
        };
        throw errorResponse;
      }

      deletedRole.isDelete = true;
      deletedRole.isActive = false;
      deletedRole.updatedDate = new Date();

      const updatedRole: RoleDocument | null = await this.roleRepository.updateById(id, deletedRole);

      return updatedRole!;
    } catch (error) {
      const errorResponse: ErrorResponse = {
        status: ROLE_ERRORS_STATUS_CODES.VALIDATION_FAILED,
        message: (error as Error).message,
        details: [],
      };

      throw errorResponse;
    }
  }

  /**
   * @description Finds roles by parameters.
   * @param {RoleParams} params - The parameters to search for.
   * @returns A promise that resolves to an array of role documents.
   */
  public async findByParams(params: RoleParams): Promise<RoleDocument[]> {
    try {
      params.isDelete = false;
      params.isActive = true;
      const foundRoles: RoleDocument[] = await this.roleRepository.findByParams(params);

      return foundRoles;
    } catch (error) {
      const errorResponse: ErrorResponse = {
        status: ROLE_ERRORS_STATUS_CODES.VALIDATION_FAILED,
        message: (error as Error).message,
        details: [],
      };

      throw errorResponse;
    }
  }

  /**
   * @description Updates a role document by its ID.
   * @param {string} id - The ID of the role to update.
   * @param {RoleDocument} roleForUpdate - The role document to update.
   * @returns A promise that resolves to the updated role document.
   */
  public async updateById(id: string, roleForUpdate: RoleDocument): Promise<RoleDocument | null> {
    try {
      const detailsErrors: DetailsErrors[] = [];

      if (!id) {
        detailsErrors.push({
          field: ROLE_ISSUES.ROLE_ID_FIELD,
          issue: ROLE_ISSUES.ROLE_REQUIRED_ID_ISSUE,
          value: id,
        });
      }

      if (detailsErrors && detailsErrors.length > 0) {
        const errorResponse: ErrorResponse = {
          status: ROLE_ERRORS_STATUS_CODES.VALIDATION_FAILED,
          message: ROLE_ISSUES.VALIDATION_FAILED,
          details: detailsErrors,
        };
        throw errorResponse;
      }

      const roleExists = await this.hasRoleInDatabase(roleForUpdate);
      if (!roleExists) {
        const errorResponse: ErrorResponse = {
          status: ROLE_ERRORS_STATUS_CODES.ROLE_NOT_FOUND,
          message: ROLE_ISSUES.ROLE_NOT_FOUND,
          details: [
            {
              field: ROLE_ISSUES.ROLE_ID_FIELD,
              issue: ROLE_ISSUES.ROLE_NOT_FOUND,
              value: id,
            },
          ],
        };
        throw errorResponse;
      }

      return this.roleRepository.updateById(id, roleForUpdate);
    } catch (error) {
      const errorResponse: ErrorResponse = {
        status: ROLE_ERRORS_STATUS_CODES.VALIDATION_FAILED,
        message: (error as Error).message,
        details: [],
      };

      throw errorResponse;
    }
  }

  /**
   * @description Finds all roles.
   * @returns A promise that resolves to an array of role documents.
   */
  public async findAll(): Promise<RoleDocument[]> {
    try {
      const params: RoleParams = {
        isDelete: false,
        isActive: true,
      };
      return await this.roleRepository.findByParams(params);
    } catch (error) {
      const errorResponse: ErrorResponse = {
        status: ROLE_ERRORS_STATUS_CODES.VALIDATION_FAILED,
        message: (error as Error).message,
        details: [],
      };

      throw errorResponse;
    }
  }

  /**
   * @description Checks if a role exists in the database.
   * @param {RoleDocument} role - The role to check.
   * @returns A promise that resolves to true if the role exists, or false if it doesn't.
   */
  private async hasRoleInDatabase(role: RoleDocument): Promise<boolean> {
    try {
      const roles = await this.findByParams({ _id: role._id.toString() });
      return roles?.length > 0;
    } catch (error) {
      const errorResponse: ErrorResponse = {
        status: ROLE_ERRORS_STATUS_CODES.VALIDATION_FAILED,
        message: (error as Error).message,
        details: [],
      };

      throw errorResponse;
    }
  }
}
