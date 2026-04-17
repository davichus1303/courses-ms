export const COMPANY_ISSUES = {
    COMPANY_ALREADY_EXISTS_MESSAGE: 'Company with the same company name already exists.',
    COMPANY_ALREADY_EXISTS_IN_INPUT_LIST_MESSAGE: 'Company with the same company name already exists in your input list.',
    COMPANY_NAME_REQUIRED_MESSAGE: 'Company name is required.',
    COMPANY_NAME_MIN_LENGTH_MESSAGE: 'Company name must be at least 3 characters long.',
    COMPANY_NAME_MAX_LENGTH_MESSAGE: 'Company name must be at most 100 characters long.',
    COMPANY_NAME_INVALID_MESSAGE: 'Company name must contain only letters, numbers, spaces, and hyphens.',
    COMPANY_NAME_DUPLICATE_MESSAGE: 'A company with the same company name already exists in your input list.',
    COMPANY_NAME_FIELD: 'name',
    COMPANY_NAME_ISSUE: 'Duplicate company name',
    COMPANY_ALREADY_EXISTS_ISSUE: 'This company already exists in the database',
    COMPANY_FOR_UPDATE_NOT_FOUND_MESSAGE: 'Company for update not found',
    COMPANY_FOR_UPDATE_ERROR_MESSAGE: 'Error updating company',
    COMPANY_HAS_ANY_ERROR: 'Company has any error',
};
export const ERRORS_CONSTANTS = {
    ALLOWED_FIELDS: ['name', 'description', 'numberEmployees', 'phone', 'email', 'address', 'website', 'principalContact', 'principalContactPhone', 'isActive', 'isDeleted'],
    SOME_FIELDS_ARE_NOT_ALLOWED: 'Some fields are not allowed: ',
    FIELD_IS_NOT_ALLOWED: 'Field is not allowed: ',
    FIELD_MUST_BE_A_STRING: 'Field must be a string: ',
    FIELD_MUST_BE_A_NUMBER: 'Field must be a positive integer: ',
};