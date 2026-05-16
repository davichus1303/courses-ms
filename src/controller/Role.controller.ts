import { Request, Response } from 'express';
import { RoleService } from '../service/Role.service';
import { ROLE_ERROR_MESSAGES_CONTROLLER, ROLE_SUCCESS_MESSAGES, ROLE_SUCCESS_STATUS_CODES, ROLE_ERRORS_STATUS_CODES } from '../constants/Role.constants';
import { RoleParams } from '../interface/RoleParams.interface';

export class RoleController {
  private readonly roleService = new RoleService();

  /**
   * @description Creates a new role
   * @param req Request object
   * @param res Response object
   * @returns Created role
   */
  public create = async (req: Request, res: Response) => {
    try {
      if (!req.body) {
        res.status(ROLE_ERRORS_STATUS_CODES.VALIDATION_FAILED).json({ message: ROLE_ERROR_MESSAGES_CONTROLLER.BODY_REQUIRED });
        return;
      }
      const role = await this.roleService.createRole(req.body);
      res.status(ROLE_SUCCESS_STATUS_CODES.ROLE_CREATED).json(role);
    } catch (error) {
      res.status(ROLE_ERRORS_STATUS_CODES.ROLE_FOR_UPDATE_ERROR).json({ message: ROLE_ERROR_MESSAGES_CONTROLLER.INTERNAL_SERVER_ERROR });
    }
  }

  public delete = async (req: Request, res: Response) => {
    try {
      if (!req.params.id) {
        res.status(ROLE_ERRORS_STATUS_CODES.VALIDATION_FAILED).json({ message: ROLE_ERROR_MESSAGES_CONTROLLER.ID_REQUIRED });
        return;
      }
      const id = req.params.id as string;
      const role = await this.roleService.deleteById(id);
      const response = {
        message: ROLE_SUCCESS_MESSAGES.DELETED_SUCCESSFULLY,
        data: role
      };
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: ROLE_ERROR_MESSAGES_CONTROLLER.INTERNAL_SERVER_ERROR });
    }
  }

  /**
   * @description Finds roles by params
   * @param req Request object
   * @param res Response object
   * @returns Found roles
   */
  public find = async (req: Request, res: Response) => {
    try {
      if (req.params.name) {
        const param: RoleParams = {
          name: req.params.name as string
        }
        const role = await this.roleService.findByParams(param);
        res.status(200).json(role);
        return;
      } else {
        const roles = await this.roleService.findAll();
        res.status(ROLE_SUCCESS_STATUS_CODES.ROLE_DELETED).json(roles);
      }
    } catch (error) {
      res.status(500).json({ message: ROLE_ERROR_MESSAGES_CONTROLLER.INTERNAL_SERVER_ERROR });
    }
  }

  /**
   * @description Updates a role by id
   * @param req Request object
   * @param res Response object
   * @returns Updated role
   */
  public update = async (req: Request, res: Response) => {
    try {
      if (!req.body && !req.params.id) {
        res.status(400).json({ message: ROLE_ERROR_MESSAGES_CONTROLLER.BODY_REQUIRED });
        return;
      }
      const id = req.params.id ? req.params.id as string : '';
      const body = req.body ? req.body : {};
      const role = await this.roleService.updateById(id, body);
      res.status(200).json(role);
    } catch (error) {
      res.status(500).json({ message: ROLE_ERROR_MESSAGES_CONTROLLER.INTERNAL_SERVER_ERROR });
    }
  }

}
