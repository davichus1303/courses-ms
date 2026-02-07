import { CourseModel } from  '../model/course.model';
import { CourseDocument } from '../interface/course.interface';

/**
 * @description Repository class for managing Course documents in the database.
 * 
 * Provides methods to create, retrieve, and manage course records.
 * 
 * @class CourseRepository
 */

export class CourseRepository {

  /**
   * @description Creates a new Course document in the database.
   * @param course course data to create a new Course document
   * @returns The created Course document.
   */
  public async create(course: Array<CourseDocument>): Promise<Array<CourseDocument>> {
    return CourseModel.create(course);
  }

  /**
   * @description Retrieves all Course documents from the database.
   * @returns An array of Course documents.
   */
  public async findAll(): Promise<Array<CourseDocument>> {
    return CourseModel.find().exec();
  }

  /**
   * @description Retrieves a Course document by its ID.
   * @param id The ID of the Course document to retrieve.
   * @returns The Course document if found, otherwise null.
   */
  public async findById(id: string): Promise<CourseDocument | null> {
    return CourseModel.findById(id).exec();
  }

  /**
   * @description Finds Course documents based on provided parameters.
   * @param params The parameters to filter Course documents.
   * @returns An array of Course documents matching the parameters.
   */
  public async findByParams(params: Object): Promise<Array<CourseDocument>> {
    return CourseModel.find(params).exec();
  }
}
