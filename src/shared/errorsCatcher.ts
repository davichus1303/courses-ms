import { DetailsErrors, ErrorResponse } from '../interface/error.interface';
import { ALLOWED_fIELDS, INVALID_TYPE_FIELD_MESSAGE, EXPECTED_STRING_MESSAGE, EXPECTED_NUMBER_MESSAGE, SOME_INVALID_FIELD_MESSAGE, UNEXPECTED_KEY_MESSAGE, EMPTY_FIELD_MESSAGE} from '../constants/courses';
import { CourseErrorEnum } from '../enums/course.enum';
/**
 * @description Utility class for catching errors in asynchronous functions.
 **/
export class ErrorsCatcher {
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