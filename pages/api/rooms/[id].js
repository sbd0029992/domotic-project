import { pool } from "../../../config/db";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return await getRoom(req, res);
    case "DELETE":
      return await deleteRoom(req, res);
    case "PUT":
      return await updateRoom(req, res);
    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
}

const getRoom = async (req, res) => {
  try {
    const { id } = req.query;
    const [result] = await pool.query("SELECT * FROM room WHERE id = ?", [id]);
    return res.status(200).json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteRoom = async (req, res) => {
  try {
    const { id } = req.query;
    await pool.query("DELETE FROM room WHERE id = ?", [id]);
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateRoom = async (req, res) => {
  const { id } = req.query;
  const { roomName } = req.body;
  try {
    await pool.query(
      "UPDATE room SET roomName = ?, updateDate = CURRENT_TIMESTAMP WHERE id = ?",
      [roomName, id]
    );
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
