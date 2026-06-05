import { Request, Response, NextFunction } from "express";
import { JwtHelper } from "../helpers/Jwt.helper";
import { AuthError } from "../constants/Auth.constants";

export class AuthMiddleware {
  /**
   * @description Verifies the JWT token from the Authorization header
   * @param req The request object
   * @param res The response object
   * @param next The next middleware function
   */
  public verifyToken(req: Request, res: Response, next: NextFunction): void {
    try {
      const authorizationHeader = req.headers.authorization;
      
      if (!authorizationHeader) {
        res.status(401).json({
          message: AuthError.HEADER_IS_REQUIRED
        });
        return;
      }

      const token = authorizationHeader.split(" ")[1];

      if (!token) {
        res.status(401).json({
          message: AuthError.TOKEN_IS_REQUIRED
        });
        return;
      }

      const decodedToken = JwtHelper.verifyToken(token);

      (req as any).user = decodedToken;

      next();
    } catch (error) {
      res.status(401).json({
        message: AuthError.INVALID_OR_EXPIRED_TOKEN
      });
    }
  }
}
