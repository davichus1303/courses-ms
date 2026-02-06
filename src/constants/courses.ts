export const ALLOWED_fIELDS = ['name', 'company', 'hours', 'completedAt', 'certificateUrl'];
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
export const DEFAULT_PAGE_SIZE = 10;
export const DEFAULT_TIMEOUT = 5000;
export const EMPTY_FIELD_MESSAGE = 'cannot be empty.';
export const EXPECTED_DATE_MESSAGE = 'expected a date value.';
export const EXPECTED_NUMBER_MESSAGE = 'expected a number value.';
export const EXPECTED_STRING_MESSAGE = 'expected a string value.';
export const INVALID_FIELD_MESSAGE = 'Invalid field provided.';
export const INVALID_TYPE_FIELD_MESSAGE = 'Invalid type for property ';
export const SOME_INVALID_FIELD_MESSAGE = 'One or more fields are invalid.';
export const UNEXPECTED_KEY_MESSAGE = 'Unexpected field found in the object.';