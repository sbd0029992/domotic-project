import { pool } from "../../../config/db";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return await getUsers(req, res);
    case "POST":
      return await saveUser(req, res);
    default:
      return res.status(400).send("Method not allowed");
  }
}

const getUsers = async (req, res) => {
  const { idUser } = req.query;
  const { role } = req.body;

  try {
    console.log("Z", req.body);
    await pool.query(
      "UPDATE user SET role = ?, updateDate = CURRENT_TIMESTAMP WHERE idUser = ? ",
      [idUser, role]
    );
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const saveUser = async (req, res) => {
  const { idUser } = req.query;
  const { role } = req.body;

  try {
    console.log("U", req.body);
    await pool.query(
      "UPDATE user SET role = ?, updateDate = CURRENT_TIMESTAMP WHERE idUser = ? ",
      [idUser, role]
    );
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
