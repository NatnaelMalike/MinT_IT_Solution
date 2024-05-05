import jwt from 'jsonwebtoken'

export default (req, res, next) => {
    // const token = req.header('x-auth-token')
    const token = req.cookies.token
    if(!token) return res.status(401).send('Access Denied Buddy, No token Provided')
        try {
            const decoded = jwt.verify(token, process.env.ACCESS_JWT_PRIVATE_KEY)
            req.user = decoded
            next()
        } catch (error) {
            res.status(400).send('Invalid Token')
        }
    
}
