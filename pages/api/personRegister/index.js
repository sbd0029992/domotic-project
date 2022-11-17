import { pool } from "../../../config/db";
import bcrypt from "bcryptjs";

export default async function hanlder(req, res) {
  switch (req.method) {
    case "GET":
      return await getPerson(req, res);
    case "POST":
      return await insertPerson(req, res);
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
const getPerson = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT p.id, p.firstName,p.lastName, p.gender,p.birthDate,u.idHome, u.userName, u.password\
        FROM person p \
        INNER JOIN user u ON  p.id = u.idUser;"
    );
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const insertPerson = async (req, res) => {
  console.log("insert", req.body);

  try {
    const password = await bcrypt.hash(req.body.password, 10);
    const {
      firstName,
      lastName,
      gender,
      birthDate,
      userName,
      idHome,
      role,
      // password,
    } = req.body;

    const [result] = await pool.query("INSERT INTO person SET ?", {
      firstName,
      lastName,
      gender,
      birthDate,
      userName: "user",
    });

    const [result2] = await pool.query("INSERT INTO user SET ?", {
      idUser: result.insertId,
      idHome,
      role: "user",
      userName,
      password,
    });

    console.log("Inser Result: ", result);
    return res
      .status(200)
      .json(
        { ...req.body, id: result.insertId },
        { ...req.body, id: result2.insertId }
      );
  } catch (err) {
    console.log("error", err.message);
    return res.status(500).json({ message: err.message });
  }
};
