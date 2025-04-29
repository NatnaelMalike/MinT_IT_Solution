import { Router } from "express";
import {
  approveUser,
  activateUser,
  deleteUser,
  editProfile,
  getAdminUsers,
  getCurrentUser,
  getTechnicianUsers,
  getUserById,
  getUsers,
} from "../controllers/user.controller.js";
import validate from "../middlewares/validate.middleware.js";
import { adminMiddleware } from "../middlewares/authorization.middleware.js";
import {
  changePasswordSchema,
  editProfileSchema,
} from "../validations/user.validation.js";
import { uploadProfilePicture } from "../controllers/fileUpload.controller.js";
import { uploadProfile } from "../services/fileUpload.service.js";

const router = Router();

router.get("/", getUsers);
router.get("/admins", getAdminUsers);
router.get("/technicians", getTechnicianUsers);
router.get("/me", getCurrentUser);
router.get("/id/:id", getUserById);
router.post("/approve/:id", approveUser);
router.post("/profile-picture", uploadProfile, uploadProfilePicture)
router.patch("/edit", validate(editProfileSchema), editProfile);
// router.patch('/changePassword',validate(changePasswordSchema), changePassword)
router.patch("/activate/:id", adminMiddleware, activateUser);
router.delete("/delete/:id", deleteUser);

export default router;
