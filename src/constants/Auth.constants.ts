export enum AuthError {
    INVALID_CREDENTIALS = 'Invalid credentials',
    USER_ROLE_NOT_FOUND = 'User role or password not found',
    HEADER_IS_REQUIRED = 'Authorization token is required',
    TOKEN_IS_REQUIRED = 'Token is required',
    INVALID_OR_EXPIRED_TOKEN = 'Invalid or expired token',
}
