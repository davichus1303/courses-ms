import { Request, Response, NextFunction } from 'express';
import { LoggerHelper } from '../helpers/Logger.helper';
import { ERROR_MESSAGES } from '../constants/Error.constants';
import { ErrorEnum } from '../enums/Error.enums';

export class ErrorMiddleware {

  /**
   * @description Handle errors in the application
   * @param {any} error The error object
   * @param {Request} req The request object
   * @param {Response} res The response object
   * @param {NextFunction} next The next function
   */
  public handle(error: any, req: Request, res: Response, next: NextFunction): void {
    LoggerHelper.error(
      `${req.method} ${req.originalUrl} - ${error.message || error}`
    );
    res.status(error.status || ErrorEnum.DEFAULT_STATUS).json({
      message: error.message || ERROR_MESSAGES.INTERNAL_SERVER_ERROR
    });
  }

}