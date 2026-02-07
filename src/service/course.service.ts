import { CourseRepository } from '../repository/course.repository';
import { CourseDocument } from '../interface/course.interface';
import { DetailsErrors, ErrorResponse } from '../interface/error.interface';
import { ErrorsCatcher } from '../shared/errorsCatcher';

/**
 * @description Service class for managing Course operations.
 * 
 * Utilizes CourseRepository to perform CRUD operations on Course documents.
 * 
 * @class CourseService
 */
export class CourseService {

  private readonly courseRepository = new CourseRepository();

  /**
   * @description Creates a new Course document.
   * @param data Array of course data to create new Course documents
   * @returns An array of created Course documents or ErrorResponse objects.
   */
  public async createCourse(data: Array<CourseDocument>): Promise<Array<CourseDocument | ErrorResponse>> {
    const errors: Array<ErrorResponse> = this.validateCourseData(data);
    
    if (errors.length > 0) {
      return errors;
    }

    if (data.length > 1) {
      const duplicatedErrors = await this.checkForDuplicateCourses(data);
      if (duplicatedErrors.length > 0) {
        return duplicatedErrors;
      }
    }
    return this.courseRepository.create(data);
  }

  /**
   * @description Retrieves Course documents by their name.
   * @param name The name of the Course documents to retrieve.
   * @returns An array of Course documents matching the params or an empty array if none found.
   */
  public async getCourseByParams(params: Object): Promise<Array<CourseDocument>> {
    try {
      return await this.courseRepository.findByParams(params);
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Retrieves all Course documents.
   * @returns An array of Course documents.
   */
  public async getCourses(): Promise<Array<CourseDocument>> {
    return this.courseRepository.findAll();
  }

  /**
   * @description Retrieves a Course document by its ID.
   * @param id The ID of the Course document to retrieve.
   * @returns The Course document if found, otherwise null.
   */
  public async getCourseById(id: any): Promise<CourseDocument | null> {
    return this.courseRepository.findById(id);
  }

  /**
   * @description Validates the course data before creation.
   * @param data Array of course data to validate
   * @throws Error if validation fails
   */
  private validateCourseData(data: Array<CourseDocument>): Array<ErrorResponse> {
    const errorsCatcher = new ErrorsCatcher();
    const errors: Array<ErrorResponse> = [];
    data.forEach(course => {
      const errorResponse = errorsCatcher.typeAnalicer(course, 'Course');
      if (errorResponse && errorResponse.details && errorResponse.details.length) {
        errors.push(errorResponse);
      }
  })
  return errors;
  }

  /**
   * @description Checks for duplicate courses in the provided data.
   * @param data Array of course data to check for duplicates
   * @returns An array of ErrorResponse objects if duplicates are found, otherwise an empty array.
   */
  private async checkForDuplicateCourses(data: Array<CourseDocument>): Promise<Array<ErrorResponse>> {
    const duplicatedCourses = await this.findDuplicateCourses(data);
    const details: Array<DetailsErrors> = [];
    const foundErrorResponse: Array<ErrorResponse> = [];
    if (duplicatedCourses.length > 0) {
      duplicatedCourses.forEach(course => {
        details.push({
          field: 'name',
          issue: 'Duplicate course name',
          value: course.name
        });
      });
      foundErrorResponse.push({
        status: 400,
        message: 'Duplicate courses found',
        details
      });
    }
    return foundErrorResponse;
  }

  /**
   * @description Checks if any Course documents exist matching the provided parameters.
   * @param params The parameters to filter Course documents.
   * @returns True if matching Course documents exist, otherwise false.
   */
  private async findDuplicateCourses(params: Array<CourseDocument>): Promise<Array<CourseDocument>> {
    const duplicatedCourses: Array<CourseDocument> = [];
    try {
        for (const param of params) {
          const { _id, hours, createdDate, updatedDate, ...cleanedParam } = param;
          const foundCourse = await this.courseRepository.findByParams(cleanedParam);
          if (foundCourse.length > 0) {
            duplicatedCourses.push(...foundCourse);
          }
        }
    } catch (error) {
      return duplicatedCourses;
    }
    return duplicatedCourses;
  }


}
