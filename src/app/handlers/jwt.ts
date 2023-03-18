import jwt from 'jsonwebtoken'

class JwtHandler {

    encode(data: { [key: string]: any }, option?: jwt.SignOptions) {
        try {
            return jwt.sign(data, process.env.JWT_SECRET as any, option)
        } catch (e) {
            console.log(this, e)
            throw new Error('Failed encode token')
        }
    }

    decode(token: string): { [key: string]: any } {
        try {
            return jwt.verify(token, process.env.JWT_SECRET as any) as any
        } catch (e) {
            console.log(this, e)
            throw new Error('Failed decode token')
        }
    }

}

export default new JwtHandler()
