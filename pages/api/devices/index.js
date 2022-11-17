import { pool } from "../../../config/db";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return getDevices(req, res);
    case "POST":
      return saveDevice(req, res);
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

const getDevices = async (req, res) => {
  try {
    const idHome = req.query.idHome;

    const [result] = await pool.query(
      `SELECT D.id,D.deviceName, D.urlDevice, R.roomName,D.idRoom, D.status\
                    FROM device D \
                    inner join room R ON R.id = D.idRoom \
                    inner join home H ON H.id = R.idHome \
                    WHERE H.id = ${idHome}`
    );
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const saveDevice = async (req, res) => {
  try {
    const { deviceName, urlDevice, idRoom } = req.body;
    const [result] = await pool.query("INSERT INTO device SET ?", {
      deviceName,
      urlDevice,
      idRoom,
    });

    return res
      .status(200)
      .json({ deviceName, urlDevice, idRoom, id: result.insertId });
  } catch (error) {
    return res.status(500).json({ message: error.message });
    console.log(error);
  }
};
