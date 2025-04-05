import { Router } from "express";
import {
  signin,
  signup,
  InviteToken,
} from "../controllers/auth.controller.js";
import validate from "../middlewares/validate.middleware.js";
import {
  inviteTokenSchema,
  loginSchema,
} from "../validations/auth.validation.js";
import { userSchema } from "../validations/user.validation.js";
import setRoleFromToken from "../middlewares/setRoleFromToken.middleware.js";

const router = Router();

router.post("/signup", setRoleFromToken, validate(userSchema), signup);
router.post("/signin", validate(loginSchema), signin);
router.post("/generate-invite", validate(inviteTokenSchema), InviteToken);

export default router;
