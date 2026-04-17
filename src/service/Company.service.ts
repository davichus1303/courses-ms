import { CompanyRepository } from '../repository/Company.repository';
import { CompanyDocument } from '../interface/Company.interface';
import { COMPANY_ISSUES } from '../constants/Company.constants';
import { DetailsErrors, ErrorResponse } from '../interface/error.interface';
import { CompanyErrorHandler } from '../handlerErrors/company.errorHandler';


/**
 * @description Service class for managing Company operations.
 * 
 * Utilizes CompanyRepository to perform CRUD operations on Company documents.
 * 
 * @class CompanyService
 */
export class CompanyService {
  
  private readonly companyRepository = new CompanyRepository();
  private readonly companyErrorHandler = new CompanyErrorHandler();

  /**
   * @description Creates a list of Company documents.
   * @param data Array of company data to create new Company documents
   * @returns An array of created Company documents.
   */
  public async createCompany(data: Array<CompanyDocument>): Promise<Array<CompanyDocument> | ErrorResponse> {
    try {
      const hasDuplicateCompaniesInputList = this.hasDuplicateCompaniesInputList(data);
      const companyFieldsErrors = this.companyErrorHandler.verifyCompanyFields(data);
      const caughtDetailsErrors: DetailsErrors[] = [];
      caughtDetailsErrors.push(...companyFieldsErrors?.details || []);
      caughtDetailsErrors.push(...(hasDuplicateCompaniesInputList || []));

      if (caughtDetailsErrors.length > 0) {
        return {
          status: 400,
          message: COMPANY_ISSUES.COMPANY_HAS_ANY_ERROR,
          details: caughtDetailsErrors
        };
      }
      const duplicateErrorsInDatabase = await this.hasDuplicateCompaniesInDatabase(data) || [];

      if (duplicateErrorsInDatabase.length > 0) {
        return {
          status: 409,
          message: COMPANY_ISSUES.COMPANY_HAS_ANY_ERROR,
          details: duplicateErrorsInDatabase
        };
      }

      return this.companyRepository.create(data);
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * @description Retrieves all Company documents from the database.
   * @returns An array of Company documents.
   */
  public async findAll(): Promise<Array<CompanyDocument>> {
    const excludeDeleted = { isDeleted: false };
    return this.companyRepository.findByParams(excludeDeleted);
  }
  
  /**
   * @description Retrieves a Company document by its ID.
   * @param id The ID of the Company document to retrieve.
   * @returns The Company document if found, otherwise null.
   */
  public async findById(id: string): Promise<CompanyDocument | null> {
    return this.companyRepository.findById(id);
  }
  
  /**
   * @description Finds Company documents based on provided parameters.
   * @param params The parameters to filter Company documents.
   * @returns An array of Company documents matching the parameters.
   */
  public async findByParams(params: Object): Promise<Array<CompanyDocument>> {
    return this.companyRepository.findByParams(params);
  }

  /**
   * @description Checks if there are duplicate company names in the provided data.
   * @param data Array of company data to check for duplicates.
   * @returns An error response if duplicates are found, otherwise null.
   */
  private async hasDuplicateCompaniesInDatabase(data: Array<CompanyDocument>): Promise<Array<DetailsErrors> | null> {
    const foundErrors: DetailsErrors[] = [];
    for (const company of data) {
        const companyToCheck = {
          ...company,
          isDeleted: false
        }
        const foundCompany = await this.companyRepository.findByParams(companyToCheck);
        if (foundCompany.length > 0) {
            foundErrors.push({
                field: COMPANY_ISSUES.COMPANY_NAME_FIELD,
                issue: COMPANY_ISSUES.COMPANY_ALREADY_EXISTS_ISSUE,
                value: company.name
            });
        }
    }
    return foundErrors.length > 0 ? foundErrors : null;
  }

  /**
   * @description Checks if there are duplicate company names in the provided data.
   * @param data Array of company data to check for duplicates.
   * @returns An error response if duplicates are found, otherwise null.
   */
  private hasDuplicateCompaniesInputList(data: Array<CompanyDocument>): Array<DetailsErrors> | null {
    const foundErrrors: DetailsErrors[] = [];
    data.forEach((company, index) => {
        const foundCompany = data.filter(c => c.name === company.name);
        const hasThisCompany = foundErrrors.some(c => c.value === company.name);
        if (foundCompany.length > 1 && !hasThisCompany) {
            foundErrrors.push({
                field: COMPANY_ISSUES.COMPANY_NAME_FIELD,
                issue: COMPANY_ISSUES.COMPANY_NAME_ISSUE,
                value: company.name
            });
        }
    });
    return foundErrrors.length > 0 ? foundErrrors : null;
  }

  /**
   * @description Deletes a Company document by its ID.
   * @param company The Company document to delete.
   * @returns The deleted Company document if found, otherwise null.
   */
  public async deleteCompany(companyId: string): Promise<CompanyDocument | ErrorResponse | null> {
    try {
      const companyExists: CompanyDocument | null = await this.companyRepository.findById(companyId);
      if (!companyExists) {
        return null;
      }
      
      return this.updateCompany({ isActive: false, isDeleted: true } as CompanyDocument, companyId);
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Retrieves a Company document by its ID.
   * @param company The Company document to retrieve.
   * @returns The Company document if found, otherwise null.
   */
  public async findCompanyById(company: CompanyDocument): Promise<CompanyDocument | null> {
    try {
      const companyExists = await this.isCompanyExists(company);
      if (!companyExists) {
        return null;
      }
      return this.companyRepository.findById(company._id.toString());
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Updates a Company document by its ID.
   * @param company The Company document to update.
   * @returns The updated Company document if found, otherwise null.
   */
  public async updateCompany(company: CompanyDocument, companyId: string): Promise<CompanyDocument | ErrorResponse | null> {
    try {
        const foundCompany: CompanyDocument | null = await this.companyRepository.findById(companyId);
        const companyExists = foundCompany !== null;

        if (!companyExists) {
          return {
            status: 404,
            message: COMPANY_ISSUES.COMPANY_FOR_UPDATE_NOT_FOUND_MESSAGE
          };
        }
        const caughtErrors = this.companyErrorHandler.verifyCompanyFields([company]);

        if (caughtErrors) {
          return caughtErrors;
        }
        const updatedCompany = await this.companyRepository.updateById(companyId, company);

        return updatedCompany;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Checks if a Company document exists by its ID.
   * @param company The Company document to check.
   * @returns A promise that resolves to an array of Company documents if found, otherwise null.
   */
  private isCompanyExists(company: CompanyDocument): Promise<CompanyDocument[] | null> {
    const paramsToFind = {
      _id: company._id,
      name: company.name,
      phone: company.phone,
      email: company.email,
      address: company.address,
      website: company.website,
      principalContact: company.principalContact,
      principalContactPhone: company.principalContactPhone
    };
    return this.companyRepository.findByParams(paramsToFind);
  }

}
