import {jwtDecode} from "jwt-decode";


export default function decodeToken(token) {
  try {
    return jwtDecode(token);
  } catch (error) {
    return null;
  }
}