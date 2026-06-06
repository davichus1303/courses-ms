import { UserErrorHandler } from "../handlerErrors/user.errorHandler";
import { UserDocument } from "../interface/User.interface";
import { UserRepository } from "../repository/User.repository";
import { DetailsErrors } from "../interface/error.interface";
import { ErrorResponse } from "../interface/error.interface";
import { STATUS_HTTP, USER_ISSUES } from "../constants/User.constants";
import { UsersParams } from "../interface/UsersParams.interface";
import { PasswordHelper } from "../helpers/Password.helper";

export class UserService {
    private userRepository = new UserRepository();
    private userErrorHandler = new UserErrorHandler();

    /**
     * @description Creates users in the database
     * @param {UserDocument[]} users The users to create
     * @returns {Promise<UserDocument[]>} The created users
     */
    public async createUsers(users: UserDocument[]): Promise<UserDocument[]> {
        try {
            const caughtErrors: DetailsErrors[] = await this.userErrorHandler.verifyUsersIntegrity(users) || [];
            const usersWithEncryptedPassword = await Promise.all(users.map(async user => ({
                ...user,
                password: user.password ? await this.encryptPassword(user.password) : undefined
            })));

            if (caughtErrors.length > 0) {
                const errorResponse: ErrorResponse = {
                    status: STATUS_HTTP.BAD_REQUEST,
                    message: USER_ISSUES.USERS_HAS_ANY_ERRORS,
                    details: caughtErrors
                };
                throw errorResponse;
            }

            return this.userRepository.create(usersWithEncryptedPassword as UserDocument[]);
        } catch (error) {
            throw error;
        }
    }

    /**
     * @description Deletes a user from the database
     * @param {string} id The id of the user to delete
     * @returns {Promise<string>} The result of the deletion
     */
    public async deleteUser(id: string): Promise<string> {
        try {
            const user = await this.userRepository.findOneById(id);
            if (!user) {
                throw new Error(USER_ISSUES.USER_NOT_FOUND);
            }
            const userToDeleted = {
                ...user,
                isActive: false,
                isDelete: true,
            } as UserDocument;
            const deletedUser = await this.updateUser(userToDeleted);

            return deletedUser ? USER_ISSUES.USER_DELETED_SUCCESSFULLY : USER_ISSUES.USER_NOT_DELETED;
        } catch (error) {
            throw error;
        }
    }

    /**
     * @description Gets all active users from the database
     * @returns {Promise<UserDocument[]>} The active users
     */
    public async getAllUsers(): Promise<Array<UserDocument>> {
        try {
            return this.userRepository.findByParams({isActive: true, isDelete: false});
        } catch (error: any) {
            throw error;
        }
    }

    /**
     * @description Gets users from the database by params
     * @param {UsersParams} params The params to filter users
     * @returns {Promise<UserDocument[]>} The users
     */
    public async getUsersByParams(params: UsersParams): Promise<Array<UserDocument>> {
        try {
            if (params.wordForSearch) {
                const queryParams = this.buildQuery(params.wordForSearch || "");
                return this.userRepository.findByParams(queryParams);
            }
            return [];
        } catch (error: any) {
            throw error;
        }
    }

    /**
     * @description Updates a user in the database
     * @param {UserDocument} users The user to update
     * @returns {Promise<UserDocument | null>} The updated user
     */
    public async updateUser(users: UserDocument): Promise<UserDocument | null> {
        try {
            const userToUpdate = await this.userRepository.findOneById(users._id.toString());
            if (!userToUpdate) {
                throw new Error(
                    STATUS_HTTP.NOT_FOUND + " " + USER_ISSUES.USER_NOT_FOUND
                );
            }
            const userForUpdate = this.buildUserObjectForUpdate(users);

            return await this.userRepository.updateById(users._id.toString(), userForUpdate);
        } catch (error) {
            throw error;
        }
    }

    /**
     * @description Builds a query object for searching users
     * @param {string} wordForSearch The word to search for
     * @returns {Object} The query object
     */
    private buildQuery(wordForSearch: string): Object {
        return { 
            $or: [
                { email: { $regex: new RegExp(wordForSearch, 'i') } }, 
                { name: { $regex: new RegExp(wordForSearch, 'i') } },
                { lastName: { $regex: new RegExp(wordForSearch, 'i') } },
                { surName: { $regex: new RegExp(wordForSearch, 'i') } }
            ],
            isDelete: false
        };
    }

    /**
     * @description Builds a user object for updating
     * @param {UserDocument} users The user to update
     * @returns {Object} The user object
     */
    private buildUserObjectForUpdate(users: UserDocument): UserDocument {
        return {
            name: users.name,
            lastName: users.lastName,
            email: users.email,
            companyOId: users.companyOId,
            roleOId: users.roleOId,
            isActive: users.isActive,
            isDelete: users.isDelete,
            updatedDate: new Date(),
            surName: users.surName
        } as UserDocument;
    }

    /**
     * @description Encrypts a password
     * @param {string} password The password to encrypt
     * @returns {Promise<string>} The encrypted password
     */
    private async encryptPassword(password: string): Promise<string> {
        return await PasswordHelper.hashPassword(password);
    }
}
