import { useEffect, useState } from "react";
import { pool } from "../../../config/db";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return getRooms(req, res);
    case "POST":
      return saveRoom(req, res);
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

const getRooms = async (req, res) => {
  try {
    const idHome = req.query.idHome;
    const idUser = req.query.idUser;

    const [result] = await pool.query(
      // `SELECT * FROM room WHERE idHome=${idHome}`
      "Select R.id,R.roomName,R.idHome\
        from access A \
        Inner join user U on U.idUser = A.idUser \
        inner join device D on D.id = A.idDevice\
        INNER JOIN room R on R.id = D.idRoom\
        WHERE U.idHome = ? AND A.idUser = ?\
        GROUP BY R.id,R.roomName",
      [idHome, idUser]
    );
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const saveRoom = async (req, res) => {
  try {
    const { roomName, idHome } = req.body;
    console.log("🚀 ~ file: index.js ~ line 40 ~ saveRoom ~ idHome", idHome);
    console.log(
      "🚀 ~ file: index.js ~ line 40 ~ saveRoom ~ roomName",
      roomName
    );
    const [result] = await pool.query("INSERT INTO room SET ?", {
      roomName,
      idHome,
    });

    return res.status(200).json({ roomName, idHome, id: result.insertId });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
