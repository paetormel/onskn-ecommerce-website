import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET ?? process.env.JSON_SECRET
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN ?? '15m';

if(!JWT_SECRET){
    throw new Error("Missing required environment variable: JWT_SECRET")
}

export const signAccessToken = (user) => {
    return jwt.sign({
        sub: String(user.id),
        email: user.email,
        role: user.role,
    },
    JWT_SECRET,
    {
        expiresIn: JWT_EXPIRES_IN,
        issuer: 'ecommerce-api',
        audience: 'ecommerce-client',
    }
)
}

export const verifyAccessToken = (token) => {
    return jwt.verify(token, JWT_SECRET,{
        issuer: 'ecommerce-api',
        audience: 'ecommerce-client',
    })
}
