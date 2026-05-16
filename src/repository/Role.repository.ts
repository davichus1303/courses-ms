import { RoleModel } from "../model/Role.model";
import { RoleDocument } from "../interface/Role.interface";

export class RoleRepository {
  /**
   * @description Creates new Role documents in the database.
   * @param {RoleDocument[]} data - The Role documents to create.
   * @returns A Promise that resolves to an array of created Role documents.
   */
  public async create(data: RoleDocument[]): Promise<RoleDocument[]> {
    return RoleModel.create(data);
  }

  /**
   * @description Finds Role documents by parameters.
   * @param {Object} params - The parameters to find Role documents by.
   * @returns A Promise that resolves to an array of Role documents.
   */
  public async findByParams(params: Object): Promise<RoleDocument[]> {
    return RoleModel.find(params);
  }

  public async findOneById(id: string): Promise<RoleDocument | null> {
    return RoleModel.findOne({ _id: id });
  }

  /**
   * @description Updates a Role document by ID.
   * @param {string} id - The ID of the Role document to update.
   * @param {RoleDocument} data - The updated Role document.
   * @returns A Promise that resolves to the updated Role document.
   */
  public async updateById(id: string, data: RoleDocument): Promise<RoleDocument | null> {
    return RoleModel.findByIdAndUpdate(id, data, { new: true });
  }

  /**
   * @description Finds all Role documents in the database.
   * @returns A Promise that resolves to an array of all Role documents.
   */
  public async findAll(): Promise<RoleDocument[]> {
    return RoleModel.find();
  }
}