import { Request, Response } from "express";
import { UserService } from "../service/User.service";
import { UsersParams } from "../interface/UsersParams.interface";

export class UserController {
    private userService = new UserService();

    /**
     * @description Creates users in the database
     * @param {Request} req The request object
     * @param {Response} res The response object
     * @returns {Promise<void>}
     */
    public createUsers = async (req: Request, res: Response): Promise<void> => {
        try {
            const users = req.body;
            const createdUsers = await this.userService.createUsers(users);
            res.status(201).json(createdUsers);
        } catch (error: any) {
            res.status(error.status || 500).json({
                message: error.message,
                details: error.details
            });
        }
    };

    /**
     * @description Deletes a user from the database
     * @param {Request} req The request object
     * @param {Response} res The response object
     * @returns {Promise<void>}
     */
    public deleteUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const userId = req.params?.userId;
            const deletedUser = await this.userService.deleteUser(userId as string);
            res.status(200).json(deletedUser);
        } catch (error: any) {
            res.status(error.status || 500).json({
                message: error.message,
                details: error.details
            });
        }
    };

    /**
     * @description Gets users from the database
     * @param {Request} req The request object
     * @param {Response} res The response object
     * @returns {Promise<void>}
     */
    public getUsers = async (req: Request, res: Response): Promise<void> => {
        try {
            const params = req.query;
            const users = params.wordForSearch ?
              await this.userService.getUsersByParams(params as UsersParams) :
              await this.userService.getAllUsers();
            res.status(200).json(users);
        } catch (error: any) {
            res.status(error.status || 500).json({
                message: error.message,
                details: error.details
            });
        }
    };

    /**
     * @description Updates users in the database
     * @param {Request} req The request object
     * @param {Response} res The response object
     * @returns {Promise<void>}
     */
    public updateUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const users = req.body ? req.body : {};
            const updatedUser = users ? await this.userService.updateUser(users) : null;

            res.status(200).json(updatedUser);
        } catch (error: any) {
            res.status(error.status || 500).json({
                message: error.message,
                details: error.details
            });
        }
    };
}