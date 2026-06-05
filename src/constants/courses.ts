export const ALLOWED_fIELDS = ['name', 'company', 'hours', 'level', 'isActive', 'isDelete'];
export const COURSE_LEVELS = {
    BEGINNER: 'beginner',
    INTERMEDIATE: 'intermediate',
    ADVANCED: 'advanced',
} as const;
export const COURSE_STATUS = {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    DRAFT: 'draft',
} as const;
export const COURSE_NOT_FOUND_MESSAGE = 'Course not found.';
export const COURSES_NOT_FOUND_MESSAGE = 'No courses found with the given param.';
export const COURSE_ALREADY_EXISTS_MESSAGE = 'Course with the same name already exists.';
export const COURSE_ID_REQUIRED_MESSAGE = 'Course ID is required.';
export const DEFAULT_PAGE_SIZE = 10;
export const DEFAULT_TIMEOUT = 5000;
export const DUPLICATE_VALUES_MESSAGE = 'has duplicate values';
export const EMPTY_FIELD_MESSAGE = 'cannot be empty.';
export const EXPECTED_DATE_MESSAGE = 'expected a date value.';
export const EXPECTED_NUMBER_MESSAGE = 'expected a number value.';
export const EXPECTED_STRING_MESSAGE = 'expected a string value.';
export const INVALID_FIELD_MESSAGE = 'Invalid field provided.';
export const INVALID_TYPE_FIELD_MESSAGE = 'Invalid type for property ';
export const REQUIRED_FIELD_MESSAGE = 'Field is required. ';
export const SOME_INVALID_FIELD_MESSAGE = 'One or more fields are invalid.';
export const UNEXPECTED_KEY_MESSAGE = 'Unexpected field found in the object.';