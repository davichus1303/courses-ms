import bcrypt from 'bcrypt';

export class PasswordHelper {
    private static readonly SALT_ROUNDS = 10;
    
    /**
     * @description Hashes a password using bcrypt
     * @param {string} password The password to hash
     * @returns {Promise<string>} The hashed password
     */
    public static async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(this.SALT_ROUNDS);
        return await bcrypt.hash(password, salt);
    }

    /**
     * @description Compares a password with a hashed password using bcrypt
     * @param {string} password The password to compare
     * @param {string} hashedPassword The hashed password to compare
     * @returns {Promise<boolean>} True if the passwords match, false otherwise
     */
    public static async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, hashedPassword);
    }
}