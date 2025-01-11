import mongoose from "mongoose";

const professionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});
const Profession = mongoose.model(
  "Profession",
  professionSchema
);

export default Profession;