import { Department, departmentValidator } from "../models/department.js"

const getDepartment = async(req, res)=>{
    const departments = await Department.find()
    res.send(departments)
}

export {getDepartment}