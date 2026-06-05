export const USER_ISSUES = {
    USER_EXTRA_FIELD: "user has extra field",
    USER_ALREADY_EXISTS_IN_DATABASE: "user already exists in database",
    USER_DELETED_SUCCESSFULLY: "user deleted successfully",
    USER_NOT_DELETED: "user not deleted",
    USERS_HAS_ANY_ERRORS: "Users has any errors",
    USER_MISSING_FIELDS: "user missing fields",
    USER_MISSING_FIELDS_MESSAGE: "User missing required fields",
    USER_REQUIRED_FIELDS: ["name", "lastName", "email", "companyOId", "roleOId"],
    USER_TYPE_ERROR: "user type error",
    USER_TYPE_ERROR_MESSAGE: "User type error",
    USER_NOT_FOUND: "User not found"
};

export const USER_FIELDS = [
    "name",
    "lastName",
    "email",
    "companyOId",
    "roleOId",
    "isActive",
    "isDelete",
    "updatedDate",
    "createdDate",
    "surName",
    "passwordHash"
];

export const STATUS_HTTP = {
    OK: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500
};

export const USER_LIST_NAME = "users";
export const USER_UNIQUE_FIELD = "email";
