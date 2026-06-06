import { CompanyModel } from '../model/Company.model';
import { CompanyDocument } from '../interface/Company.interface';

/**
 * @description Repository class for managing Company documents in the database.
 * 
 * Provides methods to create, retrieve, and manage company records.
 * 
 * @class CompanyRepository
 */
export class CompanyRepository {

  /**
   * @description Creates a list of Company documents in the database.
   * @param company company data to create a new Company document
   * @returns The created Company document.
   */
  public async create(company: Array<CompanyDocument>): Promise<Array<CompanyDocument>> {
    return CompanyModel.create(company);
  }

  /**
   * @description Retrieves all Company documents from the database.
   * @returns An array of Company documents.
   */
  public async findAll(): Promise<Array<CompanyDocument>> {
    return CompanyModel.find().exec();
  }

  /**
   * @description Retrieves a Company document by its ID.
   * @param id The ID of the Company document to retrieve.
   * @returns The Company document if found, otherwise null.
   */
  public async findById(id: string): Promise<CompanyDocument | null> {
    return CompanyModel.findById(id).exec();
  }

  /**
   * @description Finds Company documents based on provided parameters.
   * @param params The parameters to filter Company documents.
   * @returns An array of Company documents matching the parameters.
   */
  public async findByParams(params: Object): Promise<Array<CompanyDocument>> {
    return CompanyModel.find(params).exec();
  }

  /**
   * @description Updates a Company document by its ID.
   * @param id The ID of the Company document to update.
   * @param data The data to update the Company document with.
   * @returns The updated Company document if found, otherwise null.
   */
  public async updateById(id: string, data: Partial<CompanyDocument>): Promise<CompanyDocument | null> {
    return CompanyModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }
}