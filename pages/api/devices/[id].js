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
    const [result] = await pool.query(
      "SELECT D.id,D.deviceName, D.urlDevice, R.roomName,D.idRoom, D.status FROM device D INNER JOIN room R ON R.id = D.idRoom WHERE D.id = ?",
      [id]
    );
    return res.status(200).json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteRoom = async (req, res) => {
  try {
    const { id } = req.query;
    await pool.query("DELETE FROM device WHERE id = ?", [id]);
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateRoom = async (req, res) => {
  const { id } = req.query;
  const { deviceName } = req.body;
  const { urlDevice } = req.body;
  const { idRoom } = req.body;

  try {
    await pool.query(
      "UPDATE device SET deviceName = ?, urlDevice = ?, idRoom = ?, updateDate = CURRENT_TIMESTAMP WHERE id = ?",
      [deviceName, urlDevice, idRoom, id]
    );
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
