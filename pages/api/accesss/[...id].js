import { pool } from "../../../config/db";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return await getAccess(req, res);
    case "DELETE":
      return await deleteAccess(req, res);
    case "PUT":
      return await updateAccess(req, res);
    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
}

const getAccess = async (req, res) => {
  try {
    const { idUser, idDevice } = req.query;
    const [result] = await pool.query(
      "Select U.userName, D.deviceName, A.status,A.idUser,A.idDevice from access A Inner join user U on U.idUser = A.idUser inner join device D on D.id = A.idDevice WHERE A.idUser = ? AND A.idDevice = ?",
      [idUser, idDevice]
    );
    return res.status(200).json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteAccess = async (req, res) => {
  try {
    const { idUser, idDevice } = req.query;
    await pool.query("DELETE FROM access WHERE idUser = ? AND idDevice = ?", [
      idUser,
      idDevice,
    ]);
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateAccess = async (req, res) => {
  const { idUser, idDevice } = req.body;

  try {
    await pool.query(
      "UPDATE access SET idUser = ?, idDevice = ?, updateDate = CURRENT_TIMESTAMP WHERE idUser = ? AND idDevice = ?",
      { idUser, idDevice }
    );
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
