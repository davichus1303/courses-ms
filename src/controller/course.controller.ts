import { Request, Response, NextFunction } from 'express';
import { CourseService } from '../service/course.service';
import { COURSE_NOT_FOUND_MESSAGE, COURSES_NOT_FOUND_MESSAGE, COURSE_ID_REQUIRED_MESSAGE, DELETE_SUCCESS_MESSAGE } from '../constants/courses';

export class CourseController {

  private readonly courseService = new CourseService();

  /**
   * @description Creates a new Course document.
   * @param req Express request object containing course data in the body.
   * @param res Express response object used to send back the created course.
   */
  public create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const course = await this.courseService.createCourse(req.body);
      res.status(201).json(course);
    } catch (error) {
      next(error);
    }
  };

  /**
   * @description Deletes a Course document by its ID.
   * @param req Express request object containing the course ID in the parameters.
   * @param res Express response object used to send back the deleted course or a 404 error.
   */
  public delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const courseId = req.query.id?.toString();
      
      if (!courseId) {
        res.status(400).json({ message: COURSE_ID_REQUIRED_MESSAGE });
        return;
      }
      const course = await this.courseService.deleteCourse(courseId);

      if (!course) {
        res.status(404).json({ message: COURSE_NOT_FOUND_MESSAGE });
        return;
      }
      res.status(200).send({ message: DELETE_SUCCESS_MESSAGE });
    } catch (error) {
      next(error);
    }
  };

  /**
   * @description Retrieves all Course documents.
   * @param req Express request object.
   * @param res Express response object used to send back the list of courses.
   */
  public findAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
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
          res.status(404).json({ message: COURSES_NOT_FOUND_MESSAGE });
          return;
        }
        res.json(courses);
      } else {
        const courses = await this.courseService.getCourses();
        res.json(courses);
      }
    } catch (error) {
      next(error);
    }
  };

  /**
   * @description Retrieves a Course document by its ID.
   * @param req Express request object containing the course ID in the parameters.
   * @param res Express response object used to send back the found course or a 404 error.
   */
  public findById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const courseId = req.params.id.toString();
      const course = await this.courseService.getCourseById(courseId);

      if (!course) {
        res.status(404).json({ message: COURSE_NOT_FOUND_MESSAGE });
        return;
      }

      res.json(course);
    } catch (error) {
      next(error);
    }
  };

  /**
   * @description Updates a Course document by its ID.
   * @param req Express request object containing the course ID in the parameters and updated data in the body.
   * @param res Express response object used to send back the updated course or a 404 error.
   */
  public update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
    const courseId = req.query?.id?.toString();

    if (!courseId) {
      res.status(400).json({ message: COURSE_ID_REQUIRED_MESSAGE });
      return;
    }
    const course = await this.courseService.updateCourse(courseId, req.body);

    if (!course) {
      res.status(404).json({ message: COURSE_NOT_FOUND_MESSAGE });
      return;
    }

    res.json(course);
    } catch (error) {
      next(error);
    }
  };
}
