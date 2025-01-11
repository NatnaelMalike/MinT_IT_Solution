const userMiddleware = (req,  res, next) => {
    if(req.user?.role !== 'NormalUser'){
        res.status(403).json({message: 'You are not authorized to access this resource'})
        next()
    }
}
const adminMiddleware = (req,  res, next) => {
    if(req.user?.role !== 'SuperAdmin'){
        res.status(403).json({message: 'You are not authorized to access this resource'})
        next()
    }
}
const helperMiddleware = (req,  res, next) => {
    if(req.user?.role !== 'HelperAdmin'){
        res.status(403).json({message: 'You are not authorized to access this resource'})
        next()
    }
}
const technicianMiddleware = (req,  res, next) => {
    if(req.user?.role !== 'TechnicianUser'){
        res.status(403).json({message: 'You are not authorized to access this resource'})
        next()
    }
}
export  {userMiddleware, adminMiddleware, helperMiddleware, technicianMiddleware}
