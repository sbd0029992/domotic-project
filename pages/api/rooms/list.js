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
    const [result] = await pool.query(
      `SELECT * FROM room WHERE idHome = ${idHome}`
    );
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const saveRoom = async (req, res) => {
  try {
    const { roomName, idHome } = req.body;
    const [result] = await pool.query("INSERT INTO room SET ?", {
      roomName,
      idHome,
    });

    return res.status(200).json({ roomName, idHome, id: result.insertId });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
