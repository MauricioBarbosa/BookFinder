import bcrypt from 'bcrypt';
import { IHashedPassword, IHashPasswordUtil } from './../IHashPasswordUtil';

const saltRounds = 10;

export class HashPasswordUtilBcrypt implements IHashPasswordUtil{

    comparePasswords(password: string, target: string): boolean {
        const match = bcrypt.compareSync(password, target);
        return match;
    }

    async generateHash(password: string): Promise<IHashedPassword> {
        const salt = await bcrypt.genSaltSync(saltRounds);
        const password_hash = await bcrypt.hashSync(password, salt);

        return {
            salt,
            password_hash
        }
    }
}