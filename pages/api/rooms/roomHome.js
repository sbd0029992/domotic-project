import { pool } from "../../../config/db";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return getRooms(req, res);
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

const getRooms = async (req, res) => {
  try {
    const idHome = req.query.idHome;
    const [result] = await pool.query(
      // `SELECT * FROM room WHERE idHome=${idHome}`
      "SELECT * FROM room WHERE idHome = ?",
      [idHome]
    );
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
