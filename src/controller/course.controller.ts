import { Request, Response } from 'express';
import { CourseService } from '../service/course.service';

export class CourseController {

  private readonly courseService = new CourseService();

  /**
   * @description Creates a new Course document.
   * @param req Express request object containing course data in the body.
   * @param res Express response object used to send back the created course.
   */
  public create = async (req: Request, res: Response): Promise<void> => {
    const course = await this.courseService.createCourse(req.body);
    res.status(201).json(course);
  };

  /**
   * @description Retrieves all Course documents.
   * @param req Express request object.
   * @param res Express response object used to send back the list of courses.
   */
  public findAll = async (_req: Request, res: Response): Promise<void> => {
    const courses = await this.courseService.getCourses();
    res.json(courses);
  };

  /**
   * @description Retrieves a Course document by its ID.
   * @param req Express request object containing the course ID in the parameters.
   * @param res Express response object used to send back the found course or a 404 error.
   */
  public findById = async (req: Request, res: Response): Promise<void> => {
    const course = await this.courseService.getCourseById(req.params.id.toString());

    if (!course) {
      res.status(404).json({ message: "Course not found" });
      return;
    }

    res.json(course);
  };
}
