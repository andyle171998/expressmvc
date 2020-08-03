
import bcrypt from 'bcryptjs';

class PasswordService {
    static encryptPassword(palinText: string) {
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(palinText, salt);
    }
    static comparePassword(plainText: string, encrypedPassword: string) {
        return bcrypt.compareSync(plainText, encrypedPassword);
    }
}
export default PasswordService;