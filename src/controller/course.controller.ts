import { Request, Response } from 'express';
import { CourseService } from '../service/course.service';
import { COURSE_NOT_FOUND_MESSAGE, COURSEs_NOT_FOUND_MESSAGE } from '../constants/courses';

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
  public findAll = async (req: Request, res: Response): Promise<void> => {
    if (req.query.name || req.query.company) {
      const companies = req.query.company ? { company: { $regex: req.query.company, $options: "i" } } : {};
      const names = req.query.name ? { name: { $regex: req.query.name, $options: "i" } } : {};
      const level = req.query.level ? { level: req.query.level } : {};
      const params = {
        ...names,
        ...companies,
        ...level
      };
      const courses = await this.courseService.getCourseByParams(params);
      if (courses?.length === 0) {
        res.status(404).json({ message: COURSEs_NOT_FOUND_MESSAGE });
        return;
      }
      res.json(courses);
      return;
    }
    const courses = await this.courseService.getCourses();
    res.json(courses);
  };

  /**
   * @description Retrieves a Course document by its ID.
   * @param req Express request object containing the course ID in the parameters.
   * @param res Express response object used to send back the found course or a 404 error.
   */
  public findById = async (req: Request, res: Response): Promise<void> => {
    const courseId = req.params.id;
    const course = await this.courseService.getCourseById(courseId);

    if (!course) {
      res.status(404).json({ message: COURSE_NOT_FOUND_MESSAGE });
      return;
    }

    res.json(course);
  };
}
