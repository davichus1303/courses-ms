import { DetailsErrors, ErrorResponse } from '../interface/error.interface';
import {
  ALLOWED_fIELDS,
  INVALID_TYPE_FIELD_MESSAGE,
  DUPLICATE_VALUES_MESSAGE,
  EXPECTED_STRING_MESSAGE,
  EXPECTED_NUMBER_MESSAGE,
  SOME_INVALID_FIELD_MESSAGE,
  UNEXPECTED_KEY_MESSAGE,
  EMPTY_FIELD_MESSAGE,
  REQUIRED_FIELD_MESSAGE,
} from '../constants/courses';
import { CourseErrorEnum } from '../enums/course.enum';
import { ParamsForUniqueLists } from './interfaces/ParamsForUniqueLists.interface';
/**
 * @description Utility class for catching errors in asynchronous functions.
 **/
export class ErrorsCatcher {

  /**
   * @description Verifies that there are no duplicate values in a list
   * @param {ParamsForUniqueLists} params The parameters for the verification
   * @returns {Array<DetailsErrors>} An array of DetailsErrors for any duplicate values
   */
  public verifyRepeatInList(params: ParamsForUniqueLists): Array<DetailsErrors> {
    const { list, listName, uniqueField } = params;
    const caughtErrors: Array<DetailsErrors> = [];
    const processedValues = new Set<string>();
    const duplicatedValues = new Set<string>();

    for (const item of list) {
      const value = String(item[uniqueField]);

      if (processedValues.has(value)) {
          duplicatedValues.add(value);
      }
      processedValues.add(value);
    }

    if (duplicatedValues.size > 0) {
      caughtErrors.push({
          field: listName,
          issue: `${listName} ${DUPLICATE_VALUES_MESSAGE}`,
          value: Array.from(duplicatedValues)
      });
    }

    return caughtErrors;
  }

  /**
   * @description Scans for extra fields in an object
   * @param {Record<string, any>} objectToValidate The object to validate
   * @param {string[]} allowedFields The array of allowed field names
   * @returns {Array<DetailsErrors>} An array of DetailsErrors for any extra fields
   */
  public scanForExtraFieldsInObject(objectToValidate: Record<string, any>, allowedFields: string[]): Array<DetailsErrors> {
    const caughtErrors: Array<DetailsErrors> = [];
    const fields = Object.keys(objectToValidate);
    fields.forEach((field) => {
      if (!allowedFields.includes(field)) {
        caughtErrors.push({
          field,
          issue: `${UNEXPECTED_KEY_MESSAGE}${field}`,
          value: objectToValidate[field],
        });
      }
    });

    return caughtErrors || [];
  }

  /**
   * @description Verifies that all required fields are present in the object.
   * @param {Record<string, any>} objectToValidate The object to validate.
   * @param {string[]} requiredFields The array of required field names.
   * @returns {Array<DetailsErrors>} An array of DetailsErrors for any missing fields.
   */
  public verifyRequiredFields(objectToValidate: Record<string, any>, requiredFields: string[]): Array<DetailsErrors> {
    const caughtErrors: Array<DetailsErrors> = [];
    for (const field of requiredFields) {
      if (!objectToValidate[field]) {
        caughtErrors.push({
          field,
          issue: `${REQUIRED_FIELD_MESSAGE}${field}`,
          value: objectToValidate[field],
        });
      }
    }

    return caughtErrors || [];
  }

  /**
   * @description Analyzes an object to validate its properties against a specified interface.
   * @param objectToValidate The object to validate.
   * @param nameOfInterface The name of the interface to validate against.
   * @returns An array of ErrorResponse objects for any validation errors found.
   */
  public typeAnalicer(objectToValidate: any, nameOfInterface: string): ErrorResponse {
    const caughtErrors: ErrorResponse = {} as ErrorResponse;
    switch (nameOfInterface) {
      case 'Course':
        const detailsCourseErrors = this.courseTypeAnalicer(objectToValidate);
        if (detailsCourseErrors.length > 0) {
            caughtErrors.status = CourseErrorEnum.invalidCourse;
            caughtErrors.message = SOME_INVALID_FIELD_MESSAGE;
            caughtErrors.details = detailsCourseErrors;
        };
        break
      default:
        break;
    }
    return caughtErrors;
  }
  
  /**
   * @description Analyzes the properties of a Course object to ensure they match expected types.
   * @param objectToValidate The object to validate against the Course interface.
   * @returns An array of ErrorResponse objects for any type mismatches found.
   */
  private courseTypeAnalicer(objectToValidate: any): Array<DetailsErrors> {
    const caughtErrors: Array<DetailsErrors> = [];

    for (const key in objectToValidate) {
        if (!ALLOWED_fIELDS.includes(key)) {
            caughtErrors.push({
                field: key,
                issue: `${UNEXPECTED_KEY_MESSAGE}${key}`,
                value: objectToValidate[key],
            });
        }
        const value = objectToValidate[key];
        switch (key) {
          case 'name':
            if (typeof objectToValidate[key] !== 'string') {
              caughtErrors.push({
                field: key,
                issue: `${INVALID_TYPE_FIELD_MESSAGE}${key}, ${EXPECTED_STRING_MESSAGE}`,
                value,
              });
            } else if (objectToValidate[key].trim().length === 0) {
              caughtErrors.push({
                field: key,
                issue: EMPTY_FIELD_MESSAGE,
                value,
              });
            }
            break;
            case 'company':
                if (typeof objectToValidate[key] !== 'string') {
                  caughtErrors.push({
                    field: key,
                    issue: `${INVALID_TYPE_FIELD_MESSAGE}${key}, ${EXPECTED_STRING_MESSAGE}`,
                    value,
                  });
                } else if (objectToValidate[key].trim().length === 0) {
                  caughtErrors.push({
                    field: key,
                    issue: EMPTY_FIELD_MESSAGE,
                    value,
                  });
                }
                break;
            case 'hours':
                if (typeof objectToValidate[key] !== 'number') {
                  caughtErrors.push({
                    field: key,
                    issue: `${INVALID_TYPE_FIELD_MESSAGE}${key}, ${EXPECTED_NUMBER_MESSAGE}`,
                    value,
                  });
                }
                break;
            case 'level':
                if (typeof objectToValidate[key] !== 'string') {
                  caughtErrors.push({
                    field: key,
                    issue: `${INVALID_TYPE_FIELD_MESSAGE}${key}, ${EXPECTED_STRING_MESSAGE}`,
                    value,
                  });
                } else if (objectToValidate[key].trim().length === 0) {
                  caughtErrors.push({
                    field: key,
                    issue: EMPTY_FIELD_MESSAGE,
                    value,
                  });
                }
                break;
          default:
            break;
        }
    }

    if (caughtErrors.length > 0) {
      return caughtErrors;
    }
    return [];
  }
}