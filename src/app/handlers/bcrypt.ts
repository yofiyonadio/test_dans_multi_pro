import bcrypt from 'bcrypt'


class BcryptHandler {

    encrypt(password: string): string {
        return bcrypt.hashSync(password, 12)
    }

    decrypt(password: string, hash: string): boolean {
        if (bcrypt.compareSync(password, hash)) {
            return true
        }
        throw new Error('password invalid!')
    }

}

export default new BcryptHandler()
