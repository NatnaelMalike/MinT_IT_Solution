import { verifyInviteToken } from "../services/token.service.js";
import asyncMiddleware from "./async.middleware.js";

const setRoleFromToken = asyncMiddleware(async (req, res, next) => {
  const token = req.query.token;


  if (token) {
    const role = await verifyInviteToken(token);
    req.body.role = role;  
  }

  next();
});
export default setRoleFromToken;

