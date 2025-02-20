import { Router } from "express";
import { signin, signup, refreshToken  } from "../controllers/auth.controller.js";
import validate from "../middlewares/validate.middleware.js";
import { loginSchema, refreshTokenSchema } from "../validations/auth.validation.js";
import { userSchema } from "../validations/user.validation.js";

const router = Router();

router.post("/signup", validate(userSchema), signup);
router.post("/signin", validate(loginSchema), signin);
router.post('/refresh-token', validate(refreshTokenSchema), refreshToken)

export default router;
