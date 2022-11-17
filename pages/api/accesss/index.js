import { pool } from "../../../config/db";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return getAccesss(req, res);
    case "POST":
      return saveAccess(req, res);
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

const getAccesss = async (req, res) => {
  try {
    const idHome = req.query.idHome;
    const [result] = await pool.query(
      `Select U.userName, D.deviceName,R.roomName, A.status,A.idUser,A.idDevice 
        from access A \
        Inner join user U on U.idUser = A.idUser \
        inner join device D on D.id = A.idDevice \
        INNER JOIN room R on R.id = D.idRoom \
        WHERE U.idHome = ?\
        ORDER BY U.userName`,
      [idHome]
    );
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const saveAccess = async (req, res) => {
  try {
    const { idUser, idDevice } = req.body;
    const [result] = await pool.query("INSERT INTO access SET ?", {
      idUser,
      idDevice,
    });

    return res.status(200).json({ idUser, idDevice: result.insertId });
  } catch (error) {
    return res.status(500).json({ message: error.message });
    console.log(error);
  }
};
