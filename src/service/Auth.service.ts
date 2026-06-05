import bcrypt from 'bcrypt';
import { LoginDocument } from '../interface/Login.interface';
import { UserRepository } from '../repository/User.repository';
import { JwtHelper } from '../helpers/Jwt.helper';
import { AuthError } from '../constants/Auth.constants';

export class AuthService {

    private readonly userRepository = new UserRepository();

    public async login(loginData: LoginDocument): Promise<string> {
        const users = await this.userRepository.findByParams({
            email: loginData.email,
            isActive: true,
            isDelete: false
        });

        const user = users[0];

        if (!user) {
            throw new Error(AuthError.INVALID_CREDENTIALS);
        }

        if (!user.roleOId || !user.password) {
            throw new Error(AuthError.USER_ROLE_NOT_FOUND);
        }

        const isValidPassword = await bcrypt.compare(
            loginData.password,
            user.password!
        );

        if (!isValidPassword) {
            throw new Error(AuthError.INVALID_CREDENTIALS);
        }

        return JwtHelper.generateToken({
            userId: user._id.toString(),
            email: user.email,
            roleOId: user.roleOId!.toString()
        });
    }
}