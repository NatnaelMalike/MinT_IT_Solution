import Profession from "../models/profession.model.js";
import { isValidObjectId } from "mongoose";
import professionSchema from "../validations/profession.validation.js";

const getProfessions = async (req, res) => {
  const professions = await Profession.find();
  res.status(200).json(professions);
};

const getProfessionById = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    res.status(400).json({ message: "Invalid profession id." });
    return;
  }

  const profession = await Profession.findById(id);
  if (!profession) {
    res.status(404).json({ message: "Profession not found" });
    return;
  }

  res.status(200).json(profession);
};

const addProfession = async (req, res) => {
  try {
    const { error } = professionSchema.body.validate(req.body);
    if (error) {
      res.status(400).send(error.details[0].message);
      return;
    }

    const profession= await Profession.create(req.body);
    res.status(201).json(profession);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

const updateProfession = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    res.status(400).json({ message: "Invalid profession id." });
    return;
  }
  const { error } = professionSchema.body.validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const profession =
    await Profession.findByIdAndUpdate(id, req.body, {
      new: true,
    });
  if (!profession) {
    res.status(404).json({ message: "Profession not found" });
    return;
  }
  res.status(200).json(profession);
};

const deleteProfession = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    res.status(400).json({ message: "Invalid profession id." });
    return;
  }

  const profession =
    await Profession.findByIdAndDelete(id);
  if (!profession) {
    res.status(404).json({ message: "Profession not found" });
    return;
  }

  res.status(200).json({ message: "Profession deleted successfully!" });
};

export {
  getProfessions,
  getProfessionById,
  addProfession,
  updateProfession,
  deleteProfession,
};
