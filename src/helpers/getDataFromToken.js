import jwt from "jsonwebtoken";

export function getDataFromToken(req) {
  try {
    const token = req.cookies.get("token")?.value || "";
    const tokenData = jwt.verify(token, process.env.JWT_SECRET);
    return tokenData.id;
  } catch (error) {
    throw new Error(error.message);
  }
}
