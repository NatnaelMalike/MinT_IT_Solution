import Department from "../models/department.model.js";
import asyncMiddleware from "../middlewares/async.middleware.js";
import { isValidObjectId } from "mongoose";

const getDepartments = asyncMiddleware( async (req, res) => {
    const departments = await Department.find();
    res.status(200).json(departments);
});

const getDepartmentById = asyncMiddleware(async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    res.status(400).json({ message: "Invalid department id." });
    return;
  }
  const department = await Department.findById(id);
  if (!department) {
    res.status(404).json({ message: "Department not found" });
    return;
  }
  res.status(200).json(department);
});

const addDepartment = asyncMiddleware(async (req, res) => {
    const department= await Department.create(req.body);
    res.status(201).json(department);
});

const updateDepartment = asyncMiddleware(async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    res.status(400).json({ message: "Invalid department id." });
    return;
  }
  const department =
    await Department.findByIdAndUpdate(id, req.body, {
      new: true,
    });
  if (!department) {
    res.status(404).json({ message: "Department not found" });
    return;
  }
  res.status(200).json(department);
});

const deleteDepartment =asyncMiddleware(async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    res.status(400).json({ message: "Invalid department id." });
    return;
  }
  const department =
    await Department.findByIdAndDelete(id);
  if (!department) {
    res.status(404).json({ message: "Department Not Found" });
    return;
  }
  res.status(200).json({ message: "Department deleted successfully!" });
});

export {
  getDepartments,
  getDepartmentById,
  addDepartment,
  updateDepartment,
  deleteDepartment,
};
