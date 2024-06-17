import jwt from 'jsonwebtoken'

export const token = (payload:any) => {
    return jwt.sign(payload, process.env.JWT_SECRET!,{
        expiresIn: '1h'
    })
}