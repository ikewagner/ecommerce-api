import jwt from 'jsonwebtoken';

const JWT_SECRET: string = process.env.JWT_SECRET || 'thisismysecret';

class JwtService {
    static sign(payload: object, expiry: string = '60s', secret: string = JWT_SECRET): string {
        return jwt.sign(payload, secret, { expiresIn: expiry });
    }

    static verify(token: string, secret: string = JWT_SECRET): object | string {
        return jwt.verify(token, secret);
    }
}

export default JwtService;
