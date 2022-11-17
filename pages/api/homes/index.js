import { pool } from "../../../config/db";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return await getHomes(req, res);
    case "POST":
      return await saveHome(req, res);
    default:
      return res.status(400).send("Method not allowed");
  }
}

const getHomes = async (req, res) => {
  try {
    const results = await pool.query("SELECT id,address FROM home");
    return res.status(200).json(results[0]);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const saveHome = async (req, res) => {
  try {
    const { address } = req.body;
    const result = await pool.query("INSERT INTO home SET ? ", {
      address,
    });

    return res.status(200).json({ ...req.body, id: result.insertId });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
