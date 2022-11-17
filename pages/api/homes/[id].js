import { pool } from "../../../config/db";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return await getTask(req, res);
    case "DELETE":
      return await deleteHome(req, res);
    case "PUT":
      return await updateHome(req, res);
    default:
      return res.status(400).json({ message: "bad request" });
  }
}

const getTask = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM home WHERE id = ? ", [
      req.query.id,
    ]);
    return res.status(200).json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteHome = async (req, res) => {
  try {
    await pool.query("DELETE FROM home WHERE id = ?", [req.query.id]);
    return res.status(204).json();
  } catch (error) {
    console.log("DeleteHome", error.message);
    return res.status(500).json({ message: error.message });
  }
};

const updateHome = async (req, res) => {
  const { id } = req.query;
  const { address } = req.body;
  try {
    console.log(req.body);
    await pool.query(
      "UPDATE home SET address = ?, updateDate = CURRENT_TIMESTAMP WHERE id = ?",
      [address, id]
    );
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
