import { UserDocument } from "../interface/User.interface";
import { DetailsErrors } from "../interface/error.interface";
import { USER_ISSUES, USER_FIELDS, USER_LIST_NAME, USER_UNIQUE_FIELD } from "../constants/User.constants";
import { UserRepository } from "../repository/User.repository";
import { AcceptedFields } from "../enums/users.enum";
import { ErrorsCatcher } from "../shared/errorsCatcher";

export class UserErrorHandler {
    private errorsCatcher = new ErrorsCatcher();
    private userRepository = new UserRepository();

    /**
     * @description Verifies if users have all required fields and correct types
     * @param {UserDocument[]} users The users to verify
     * @returns {DetailsErrors[] | null} DetailsErrors if missing fields or wrong types, null otherwise
     */
    public async verifyUsersIntegrity(users: UserDocument[]): Promise<DetailsErrors[] | null> {
        const caughtDetailsErrors: DetailsErrors[] = [];
        const duplicatedUsersInList: DetailsErrors[] = this.errorsCatcher.verifyRepeatInList({
            list: users,
            listName: USER_LIST_NAME,
            uniqueField: USER_UNIQUE_FIELD
        });
        caughtDetailsErrors.push(...duplicatedUsersInList);
        const emails: string[] = users.map(user => user.email);
        const searchParams = { email: { $in: emails } };
        const existingUsers = await this.userRepository.findByParams(searchParams);
        const existingEmails = new Set(
            existingUsers.map(user => user.email)
        );

        for (const user of users) {
          const requiredFieldsError = this.errorsCatcher.verifyRequiredFields(user, USER_ISSUES.USER_REQUIRED_FIELDS);
        
          if (requiredFieldsError) {
            caughtDetailsErrors.push(...requiredFieldsError);
          }
          const userExistsInDatabase: boolean = existingEmails.has(user.email);

          if (userExistsInDatabase) {
            caughtDetailsErrors.push({
                issue: USER_ISSUES.USER_ALREADY_EXISTS_IN_DATABASE,
                field: USER_FIELDS[AcceptedFields.email],
                value: user.email,
            });
          }

          if (requiredFieldsError === null && !userExistsInDatabase) {
            const typeOfFieldsError = this.verifyTypeOfFields(user);
            
            if (typeOfFieldsError) {
                caughtDetailsErrors.push(...typeOfFieldsError);
            }
            const extraFieldsError = this.errorsCatcher.scanForExtraFieldsInObject(user, USER_FIELDS);

            if (extraFieldsError) {
                caughtDetailsErrors.push(...extraFieldsError);
            }
          }
        }
        
        return caughtDetailsErrors.length > 0 ? caughtDetailsErrors : null;
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
                case 'password':
                    if (typeof user.password !== 'string') {
                        caughtErrors.push({
                            issue: USER_ISSUES.USER_TYPE_ERROR,
                            value: user.password,
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

}
