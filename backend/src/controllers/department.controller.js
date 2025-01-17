import Department from "../models/department.model.js";
import departmentSchema from "../validations/department.validation.js";
import { isValidObjectId } from "mongoose";

const getDepartments = async (req, res) => {
  const departments = await Department.find();
  res.status(200).json(departments);
};

const getDepartmentById = async (req, res) => {
  const { id } = req.params;
  // if (!isValidObjectId(id)) {
  //   res.status(400).json({ message: "Invalid department id." });
  //   return;
  // }

  const department = await Department.findById(id);
  if (!department) {
    res.status(404).json({ message: "Department not found" });
    return;
  }

  res.status(200).json(department);
};

const addDepartment = async (req, res) => {
  try {
    // const { error } = departmentSchema.body.validate(req.body);
    // if (error) {
    //   res.status(400).send(error.details[0].message);
    //   return;
    // }

    const department= await Department.create(req.body);
    res.status(201).json(department);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

const updateDepartment = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    res.status(400).json({ message: "Invalid department id." });
    return;
  }

  // const { error } = departmentSchema.body.validate(req.body);
  // if (error) {
  //   res.status(400).send(error.details[0].message);
  //   return;
  // }

  const department =
    await Department.findByIdAndUpdate(id, req.body, {
      new: true,
    });
  if (!department) {
    res.status(404).json({ message: "Department not found" });
    return;
  }

  res.status(200).json(department);
};

const deleteDepartment = async (req, res) => {
  const { id } = req.params;
  // if (!isValidObjectId(id)) {
  //   res.status(400).json({ message: "Invalid department id." });
  //   return;
  // }

  const department =
    await Department.findByIdAndDelete(id);
  if (!department) {
    res.status(404).json({ message: "Department Not Found" });
    return;
  }

  res.status(200).json({ message: "Department deleted successfully!" });
};

export {
  getDepartments,
  getDepartmentById,
  addDepartment,
  updateDepartment,
  deleteDepartment,
};
