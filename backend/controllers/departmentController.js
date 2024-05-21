import _ from "lodash";
import { Department, departmentValidator } from "../models/department.js";

const getDepartment = async (req, res) => {
    const departments = await Department.find();
    res.send(departments);
};
const addDepartment = async (req, res) => {
    const { error } = departmentValidator(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let department = await Department.findOne({ name: req.body.name });
    if (department) return res.status(400).send("Department already Exist!!!");
    department = new Department(_.pick(req.body, ["name"]));
    await department.save();
    res.send(department);
};
const updateDepartment = async (req, res) => {
    const { error } = departmentValidator(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let department = await Department.findByIdAndUpdate(
        req.params.id,
        _.pick(req.body, ["name"]),
        { new: true }
    );
    if (!department) return res.status(404).send("Department not Found");
    res.send(department);
};
const deleteDepartment = async (req, res) => {
    const department = await Department.findByIdAndDelete(req.params.id);
    if (!department) return res.status(404).send("Department not Found");
    res.send(department);
};
const getById = async(req, res)=>{
    const department = await Department.findById(req.params.id);
    if(!department) return res.status(404).send("Department not Found");
    res.send(department)
}
export { getDepartment, addDepartment, updateDepartment, deleteDepartment, getById };
