import { User } from "../models/user.js"
import {Technician} from "../models/technician.js"
import { Department } from "../models/department.js"
import { Request } from "../models/request.js"

const getDashboardData = async (req, res)=> {
    try {
        const userCount = await User.countDocuments({})
        const techCount = await Technician.countDocuments({})
        const deptCount = await Department.countDocuments({})
        const pendingReq = await Request.countDocuments({status: 'Pending'})
        const resolvedReq = await Request.countDocuments({status: 'Resolved'})
        const unresolvedReq = await Request.countDocuments({status: 'UnResolved'})
        const notAssigned = await Request.countDocuments({isAssigned: false})
        const assigned = await Request.countDocuments({isAssigned: true})
        res.send({userCount, techCount, deptCount, pendingReq, resolvedReq, unresolvedReq, assigned, notAssigned})
    } catch (error) {
        console.log('Internal Server Error', error.message)
    }
}
export {getDashboardData}