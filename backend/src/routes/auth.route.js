import { Router } from "express";
import {
  signin,
  signup,
  refreshToken,
  InviteToken,
} from "../controllers/auth.controller.js";
import validate from "../middlewares/validate.middleware.js";
import {
  inviteTokenSchema,
  loginSchema,
  refreshTokenSchema,
} from "../validations/auth.validation.js";
import { userSchema } from "../validations/user.validation.js";
import { uploadProfilePicture } from "../services/fileUpload.service.js";

const router = Router();

router.post("/signup", validate(userSchema), uploadProfilePicture, signup);
router.post("/signin", validate(loginSchema), signin);
router.post("/refresh-token", validate(refreshTokenSchema), refreshToken);
router.post("/generate-invite", validate(inviteTokenSchema), InviteToken);

export default router;
