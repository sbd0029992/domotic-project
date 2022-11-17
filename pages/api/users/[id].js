import { pool } from "../../../config/db";

export default async function handler(req, res) {
  switch (req.method) {
    case "PUT":
      return await updateUser(req, res);
    default:
      return res.status(400).json({ message: "bad request" });
  }
}

const updateUser = async (req, res) => {
  const { idUser, role } = req.body;
  try {
    await pool.query(
      "UPDATE user SET role = ?, updateDate = CURRENT_TIMESTAMP WHERE idUser = ? ",
      [role, idUser]
    );
    console.log(res.data);
    return res.status(204).json();
  } catch (error) {
    console.error(error.message);
  }
};
