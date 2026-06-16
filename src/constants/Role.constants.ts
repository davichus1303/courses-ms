export const ROLE_ISSUES = {
    ROLE_ALREADY_EXISTS_MESSAGE: 'Role with the same role name already exists.',
    ROLE_ALREADY_EXISTS_IN_INPUT_LIST_MESSAGE: 'Role with the same role name already exists in your input list.',
    ROLE_NAME_REQUIRED_MESSAGE: 'Role name is required.',
    ROLE_NAME_MIN_LENGTH_MESSAGE: 'Role name must be at least 3 characters long.',
    ROLE_NAME_MAX_LENGTH_MESSAGE: 'Role name must be at most 100 characters long.',
    ROLE_NAME_INVALID_MESSAGE: 'Role name must contain only letters, numbers, spaces, and hyphens.',
    ROLE_NAME_DUPLICATE_MESSAGE: 'A role with the same role name already exists in your input list.',
    ROLE_NAME_FIELD: 'name',
    ROLE_NAME_ISSUE: 'Duplicate role name',
    ROLE_ALREADY_EXISTS_ISSUE: 'This role already exists in the database',
    ROLE_FOR_UPDATE_NOT_FOUND_MESSAGE: 'Role for update not found',
    ROLE_FOR_UPDATE_ERROR_MESSAGE: 'Error updating role',
    ROLE_HAS_ANY_ERROR: 'Role has any error',
    ROLE_NOT_FOUND: 'Role not found',
    ROLE_ID_FIELD: 'id',
    ROLE_REQUIRED_ID_ISSUE: 'Role id is required',
    ROLE_NOT_FOUND_ISSUE: 'Role not found',
    PERMISSIONS_FIELD: 'permissions',
    PERMISSIONS_UNIQUE: 'Permissions must be unique',
    PERMISSIONS_TYPE: 'Permissions must be an array of objects',
    PERMISSIONS_INVALID_FIELD: `permissions of role: `,
    PERMISSIONS_INVALID: 'Permission must have pageName and actions',
    VALIDATION_FAILED: 'Validation failed',
};

export const ROLE_ERRORS_STATUS_CODES = {
    ROLE_ALREADY_EXISTS: 409,
    ROLE_ALREADY_EXISTS_IN_INPUT_LIST: 409,
    ROLE_NAME_REQUIRED: 400,
    ROLE_NAME_MIN_LENGTH: 400,
    ROLE_NAME_MAX_LENGTH: 400,
    ROLE_NAME_INVALID: 400,
    ROLE_NAME_DUPLICATE: 400,
    ROLE_FOR_UPDATE_NOT_FOUND: 404,
    ROLE_FOR_UPDATE_ERROR: 500,
    ROLE_HAS_ANY_ERROR: 400,
    ROLE_NOT_FOUND: 404,
    VALIDATION_FAILED: 400,
};

export const ROLE_SUCCESS_MESSAGES = {
    ROLE_CREATED: 'Role created successfully',
    ROLE_UPDATED: 'Role updated successfully',
    ROLE_DELETED: 'Role deleted successfully',
    ROLE_FOUND: 'Role found successfully',
    DELETED_SUCCESSFULLY: 'Role deleted successfully',
};
export const ROLE_SUCCESS_STATUS_CODES = {
    ROLE_CREATED: 201,
    ROLE_UPDATED: 200,
    ROLE_DELETED: 200,
};

export const ROLE_ERROR_MESSAGES_CONTROLLER = {
    BODY_REQUIRED: 'Body is required',
    ID_REQUIRED: 'Id is required',
    INTERNAL_SERVER_ERROR: 'Internal server error',
};
export const ROOT_ROLE_NAME = 'root';
