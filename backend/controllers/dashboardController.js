import { User } from "../models/user"
import {Technician} from "../models/technician"
import { Department } from "../models/department"
import { Request } from "../models/request"

const getDashboardData = async (req, res)=> {
    try {
        const userCount = await User.countDocuments({})
        const techCount = await Technician.countDocuments({})
        const deptCount = await Department.countDocuments({})
        const pendingReq = await Request.countDocuments({status: 'Pending'})
        const resolvedReq = await Request.countDocuments({status: 'Resolved'})
        const unresolvedReq = await Request.countDocuments({status: 'UnResolved'})
        res.send({userCount, techCount, deptCount, pendingReq, resolvedReq, unresolvedReq})
    } catch (error) {
        console.log('Internal Server Error', error.message)
    }
}
export {getDashboardData}