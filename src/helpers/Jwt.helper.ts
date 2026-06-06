import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import { JwtPayload } from '../interface/jwtpayload.interface';

export class JwtHelper {

    /**
     * @description Generates a JWT token
     * @param {JwtPayload} payload User information
     * @returns {string} JWT token
     */
    public static generateToken(payload: JwtPayload): string {
        return jwt.sign(
            payload,
            process.env.JWT_SECRET as Secret,
            {
                expiresIn: process.env.JWT_EXPIRES_IN || '1h'
            } as SignOptions
        );
    }

    /**
     * @description Verifies a JWT token
     * @param {string} token JWT token
     * @returns {JwtPayload} Decoded payload
     */
    public static verifyToken(
        token: string
    ): JwtPayload {
        return jwt.verify(
            token,
            process.env.JWT_SECRET as Secret
        ) as JwtPayload;
    }
}