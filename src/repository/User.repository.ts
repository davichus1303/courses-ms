import { UserModel } from "../model/User.model";
import { UserDocument } from "../interface/User.interface";

export class UserRepository {
  /**
   * @description Creates new User documents in the database.
   * @param {UserDocument[]} data - The User documents to create.
   * @returns A Promise that resolves to an array of created User documents.
   */
  public async create(data: UserDocument[]): Promise<UserDocument[]> {
    return UserModel.create(data);
  }

  /**
   * @description Finds User documents by parameters.
   * @param {Object} params - The parameters to find User documents by.
   * @returns A Promise that resolves to an array of User documents.
   */
  public async findByParams(params: Object): Promise<UserDocument[]> {
    return UserModel.find(params);
  }

  public async findOneById(id: string): Promise<UserDocument | null> {
    return UserModel.findOne({ _id: id });
  }

  /**
   * @description Updates a User document by ID.
   * @param {string} id - The ID of the User document to update.
   * @param {UserDocument} data - The updated User document.
   * @returns A Promise that resolves to the updated User document.
   */
  public async updateById(id: string, data: UserDocument): Promise<UserDocument | null> {
    return UserModel.findByIdAndUpdate(id, data, { new: true });
  }

  /**
   * @description Finds all User documents in the database.
   * @returns A Promise that resolves to an array of all User documents.
   */
  public async findAll(): Promise<UserDocument[]> {
    return UserModel.find();
  }
}
