import { Router } from "express";
import {
  signin,
  signup,
  refreshToken,
  InviteToken,
  logout,
} from "../controllers/auth.controller.js";
import validate from "../middlewares/validate.middleware.js";
import {
  inviteTokenSchema,
  loginSchema,
  refreshTokenSchema,
} from "../validations/auth.validation.js";
import { userSchema } from "../validations/user.validation.js";
import setRoleFromToken from "../middlewares/setRoleFromToken.middleware.js";

const router = Router();

router.post("/signup", setRoleFromToken, validate(userSchema), signup);
router.post("/signin", validate(loginSchema), signin);
router.post("/refresh-token", refreshToken);
router.post("/generate-invite", validate(inviteTokenSchema), InviteToken);
router.post("/logout", logout);

export default router;
