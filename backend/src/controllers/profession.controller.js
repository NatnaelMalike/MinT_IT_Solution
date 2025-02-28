import Profession from "../models/profession.model.js";
import { isValidObjectId } from "mongoose";
import asyncMiddleware from "../middlewares/async.middleware.js";

const getProfessions = asyncMiddleware(async (req, res) => {
  const professions = await Profession.find();
  res.status(200).json(professions);
});

const getProfessionById = asyncMiddleware(async (req, res) => {
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
});

const addProfession = asyncMiddleware(async (req, res) => {
  const profession = await Profession.create(req.body);
  res.status(201).json(profession);
});

const updateProfession = asyncMiddleware(async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    res.status(400).json({ message: "Invalid profession id." });
    return;
  }
  const profession = await Profession.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!profession) {
    res.status(404).json({ message: "Profession not found" });
    return;
  }
  res.status(200).json(profession);
});

const deleteProfession = asyncMiddleware(async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    res.status(400).json({ message: "Invalid profession id." });
    return;
  }

  const profession = await Profession.findByIdAndDelete(id);
  if (!profession) {
    res.status(404).json({ message: "Profession not found" });
    return;
  }
  res.status(200).json({ message: "Profession deleted successfully!" });
});

export {
  getProfessions,
  getProfessionById,
  addProfession,
  updateProfession,
  deleteProfession,
};
