import { UserDocument } from "../interface/User.interface";
import { DetailsErrors } from "../interface/error.interface";
import { USER_ISSUES, USER_FIELDS } from "../constants/User.constants";
import { UserRepository } from "../repository/User.repository";
import { AcceptedFields } from "../enums/users.enum";
import { PasswordHelper } from "../helpers/Password.helper";

export class UserErrorHandler {
    /**
     * @description Verifies if users have all required fields and correct types
     * @param {UserDocument[]} users The users to verify
     * @returns {DetailsErrors[] | null} DetailsErrors if missing fields or wrong types, null otherwise
     */
    public async verifyUsersIntegrity(users: UserDocument[]): Promise<DetailsErrors[] | null> {
        const caughtDetailsErrors: DetailsErrors[] = [];
        
        for (const user of users) {
            const requiredFieldsError = this.verifyRequiredFields(user);
            const userExists = await this.existsUserByEmail(user.email);
            
            if (requiredFieldsError) {
                caughtDetailsErrors.push(...requiredFieldsError);
            }

            if (userExists) {
                caughtDetailsErrors.push({
                    issue: USER_ISSUES.USER_ALREADY_EXISTS_IN_DATABASE,
                    field: USER_FIELDS[AcceptedFields.email],
                    value: user.email,
                });
            }

            if (requiredFieldsError === null && !userExists) {
                const typeOfFieldsError = this.verifyTypeOfFields(user);
                
                if (typeOfFieldsError) {
                    caughtDetailsErrors.push(...typeOfFieldsError);
                }
                const extraFieldsError = this.scanForExtraFields(user);

                if (extraFieldsError) {
                    caughtDetailsErrors.push(...extraFieldsError);
                }
                user.passwordHash = user.passwordHash ? await this.cryptPassword(user.passwordHash) : undefined;
            }
        }
        
        return caughtDetailsErrors.length > 0 ? caughtDetailsErrors : null;
    }

    /**
     * @description Verifies if a user exists by email
     * @param {string} email The email to verify
     * @returns {Promise<boolean>} true if user exists, false otherwise
     */
    public async existsUserByEmail(email: string): Promise<boolean> {
        try {
            const userRepository = new UserRepository();
            const user = await userRepository.findByParams({ email });

            return user !== null && user.length > 0;
        } catch (error) {
            throw error;
        }
    }

    /**
     * @description Verifies if a user has all required fields
     * @param {UserDocument} user The user document to verify
     * @returns {DetailsErrors[] | null} DetailsErrors if missing fields, null otherwise
     */
    private verifyRequiredFields(user: UserDocument): DetailsErrors[] | null {
        const errors: DetailsErrors[] = [];
        const requiredFields = USER_ISSUES.USER_REQUIRED_FIELDS;
        requiredFields.forEach((field) => {
            if (!(field in user)) {
                errors.push({
                    issue: USER_ISSUES.USER_MISSING_FIELDS,
                    value: field,
                    field: field
                });
            }
        });
        return errors.length > 0 ? errors : null;
    }

    /**
     * @description Verifies if a user has all required fields
     * @param {UserDocument} user The user document to verify
     * @returns {DetailsErrors[] | null} DetailsErrors if missing fields, null otherwise
     */
    private verifyTypeOfFields(user: UserDocument): DetailsErrors[] | null {
        const caughtErrors: DetailsErrors[] = [];
        Object.keys(user).forEach((fieldsUser) => {
            switch (fieldsUser) {
                case 'name':
                    if (typeof user.name !== 'string') {
                        caughtErrors.push({
                            issue: USER_ISSUES.USER_TYPE_ERROR,
                            value: user.name,
                            field: fieldsUser
                        });
                    }
                    break;
                case 'lastName':
                    if (typeof user.lastName !== 'string') {
                        caughtErrors.push({
                            issue: USER_ISSUES.USER_TYPE_ERROR,
                            value: user.lastName,
                            field: fieldsUser
                        });
                    }
                    break;
                case 'companyOId':
                    if (typeof user.companyOId !== 'string') {
                        caughtErrors.push({
                            issue: USER_ISSUES.USER_TYPE_ERROR,
                            value: user.companyOId,
                            field: fieldsUser
                        });
                    }
                    break;
                case 'email':
                    if (typeof user.email !== 'string') {
                        caughtErrors.push({
                            issue: USER_ISSUES.USER_TYPE_ERROR,
                            value: user.email,
                            field: fieldsUser
                        });
                    }
                    break;
                case 'roleOId':
                    if (typeof user.roleOId !== 'string') {
                        caughtErrors.push({
                            issue: USER_ISSUES.USER_TYPE_ERROR,
                            value: user.roleOId,
                            field: fieldsUser
                        });
                    }
                    break;
                case 'isActive':
                    if (typeof user.isActive !== 'boolean') {
                        caughtErrors.push({
                            issue: USER_ISSUES.USER_TYPE_ERROR,
                            value: user.isActive,
                            field: fieldsUser
                        });
                    }
                    break;
                case 'isDelete':
                    if (typeof user.isDelete !== 'boolean') {
                        caughtErrors.push({
                            issue: USER_ISSUES.USER_TYPE_ERROR,
                            value: user.isDelete,
                            field: fieldsUser
                        });
                    }
                    break;
                case 'passwordHash':
                    if (typeof user.passwordHash !== 'string') {
                        caughtErrors.push({
                            issue: USER_ISSUES.USER_TYPE_ERROR,
                            value: user.passwordHash,
                            field: fieldsUser
                        });
                    }
                    break;
                default:
                    break;
            }
        });
        return caughtErrors.length > 0 ? caughtErrors : null;
    }

    /**
     * @description Scans for extra fields in the user object
     * @param {any} user The user object to scan
     * @returns {DetailsErrors[] | null} DetailsErrors if extra fields found, null otherwise
     */
    private scanForExtraFields(user: any): DetailsErrors[] | null {
        const caughtErrors: DetailsErrors[] = [];
        const fieldsUser = Object.keys(user);
        fieldsUser.forEach((field) => {
            if (!USER_FIELDS.includes(field)) {
                caughtErrors.push({
                    issue: USER_ISSUES.USER_EXTRA_FIELD,
                    value: user[field],
                    field: field
                });
            }
        });
        return caughtErrors.length > 0 ? caughtErrors : null;
    }

    /**
     * @description Crypts the password
     * @param {string} password The password to crypt
     * @returns {Promise<string>} The crypted password
     */
    private async cryptPassword(password: string): Promise<string> {
        return await PasswordHelper.hashPassword(password);
    }
}
