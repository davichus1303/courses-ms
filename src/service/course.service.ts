import { CourseRepository } from '../repository/course.repository';
import { CourseDocument } from '../interface/course.interface';
import { ErrorResponse } from '../interface/error.interface';
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
    return this.courseRepository.create(data);
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
  public async getCourseById(id: string): Promise<CourseDocument | null> {
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

}
