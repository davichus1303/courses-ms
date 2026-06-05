import { ERRORS_CONSTANTS } from "../constants/Company.constants";
import { DetailsErrors, ErrorResponse } from "../interface/error.interface";
import { ErrorsCatcher } from "../shared/errorsCatcher";

export class CompanyErrorHandler {

  private errorsCatcher = new ErrorsCatcher();

  /**
   * @description Verifies the fields of a company object and returns an array of details errors if any.
   * @param companyObject - The company object to verify.
   * @returns An array of details errors if any, or null if no errors found.
   */
  public verifyCompanyFields(companyObject: any): ErrorResponse | null {
    const caughtDetailsErrors: DetailsErrors[] = [];
    for (const key in companyObject) {
      const companyFieldsErrors = this.errorsCatcher.scanForExtraFieldsInObject(companyObject[key], ERRORS_CONSTANTS.ALLOWED_FIELDS);
      const companyTypeErrors = this.verifyCompanyTypeFields(companyObject[key]);
      const companyValuesErrors = this.verifyFieldsHasValue(companyObject[key], caughtDetailsErrors);

      if (companyFieldsErrors && companyFieldsErrors.length > 0) {
        caughtDetailsErrors.push(...companyFieldsErrors);
      }
      
      if (companyTypeErrors && companyTypeErrors.length > 0) {
        caughtDetailsErrors.push(...companyTypeErrors);
      }
      
      if (companyValuesErrors && companyValuesErrors.length > 0) {
        caughtDetailsErrors.push(...companyValuesErrors);
      }
    }
    
    const caughtErrors: ErrorResponse = {
      status: 400,
      message: 'Invalid company fields',
      details: caughtDetailsErrors
    };
    return caughtDetailsErrors?.length > 0 ? caughtErrors : null;
  }

  /**
   * @description Verifies the fields of a company object and returns an array of details errors if any.
   * @param companyObject - The company object to verify.
   * @returns An array of details errors if any, or null if no errors found.
   */
  private verifyCompanyTypeFields(companyObject: any): DetailsErrors[] | null {
    const detailsErrors: DetailsErrors[] = [];

    for (const key in companyObject) {
      switch (key) {
        case 'name':
          if (companyObject[key] !== null && typeof companyObject[key] !== 'string') {
            detailsErrors.push({
              field: key,
              issue: `${ERRORS_CONSTANTS.FIELD_MUST_BE_A_STRING}${key}`,
              value: companyObject[key],
            });
          }
          break;
        case 'description':
          if (typeof companyObject[key] !== 'string') {
            detailsErrors.push({
              field: key,
              issue: `${ERRORS_CONSTANTS.FIELD_MUST_BE_A_STRING}${key}`,
              value: companyObject[key],
            });
          }
          break;
        case 'address':
          if (typeof companyObject[key] !== 'string') {
            detailsErrors.push({
              field: key,
              issue: `${ERRORS_CONSTANTS.FIELD_MUST_BE_A_STRING}${key}`,
              value: companyObject[key],
            });
          }
          break;
        case 'phone':
          if (typeof companyObject[key] !== 'string') {
            detailsErrors.push({
              field: key,
              issue: `${ERRORS_CONSTANTS.FIELD_MUST_BE_A_STRING}${key}`,
              value: companyObject[key],
            });
          }
          break;
        case 'email':
          if (typeof companyObject[key] !== 'string') {
            detailsErrors.push({
              field: key,
              issue: `${ERRORS_CONSTANTS.FIELD_MUST_BE_A_STRING}${key}`,
              value: companyObject[key],
            });
          }
          break;
        case 'website':
          if (typeof companyObject[key] !== 'string') {
            detailsErrors.push({
              field: key,
              issue: `${ERRORS_CONSTANTS.FIELD_MUST_BE_A_STRING}${key}`,
              value: companyObject[key],
            });
          }
          break;
        case 'address':
          if (typeof companyObject[key] !== 'string') {
            detailsErrors.push({
              field: key,
              issue: `${ERRORS_CONSTANTS.FIELD_MUST_BE_A_STRING}${key}`,
              value: companyObject[key],
            });
          }
          break;
        case 'principalContact':
          if (typeof companyObject[key] !== 'string') {
            detailsErrors.push({
              field: key,
              issue: `${ERRORS_CONSTANTS.FIELD_MUST_BE_A_STRING}${key}`,
              value: companyObject[key],
            });
          }
          break;
        case 'principalContactPhone':
          if (typeof companyObject[key] !== 'string') {
            detailsErrors.push({
              field: key,
              issue: `${ERRORS_CONSTANTS.FIELD_MUST_BE_A_STRING}${key}`,
              value: companyObject[key],
            });
          }
          break;
        case 'numberEmployees':
          if (typeof companyObject[key] !== 'number' || companyObject[key] <= 0) {
            detailsErrors.push({
              field: key,
              issue: `${ERRORS_CONSTANTS.FIELD_MUST_BE_A_NUMBER}${key}`,
              value: companyObject[key],
            });
          }
          break;
        default:
          break;
      }
    }

    if (detailsErrors.length > 0) {
      return detailsErrors;
    }
    return null;
  }

  /**
   * @description Verifies if the company object has values for all fields
   * @param companyObject The company object to verify
   * @returns An array of details errors if there are any, or null if there are no errors
   */
  private verifyFieldsHasValue(companyObject: any, caughtDetailsErrors: DetailsErrors[]): DetailsErrors[] | null {
    const detailsErrors: DetailsErrors[] = [];
    for (const key in companyObject) {
      const isAlreadyInErrors = caughtDetailsErrors.some(error => error.field === key);
      if (isAlreadyInErrors &&
        (!companyObject[key] || companyObject[key] === '' || companyObject[key] === null || companyObject[key] === undefined || companyObject[key] <= 0)
      ) {
        detailsErrors.push({
          field: key,
          issue: `Field ${key} value is required2`,
          value: companyObject[key],
        });
      }
    }
    return detailsErrors.length > 0 ? detailsErrors : null;
  }
}