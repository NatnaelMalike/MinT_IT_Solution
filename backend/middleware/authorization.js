import jwt from 'jsonwebtoken'

export default (req, res, next) => {
    // const token = req.header('x-auth-token')
    const {authoriztion} = req.headers
    if(!authoriztion) return res.status(401).send('Access Denied!, No token Provided');
    const token = authoriztion.split(' ')[1];
        try {
            const decoded = jwt.verify(token, process.env.ACCESS_JWT_PRIVATE_KEY)
            req.user = decoded
            next()
        } catch (error) {
            res.status(400).send('Invalid Token')
        }
    
}
