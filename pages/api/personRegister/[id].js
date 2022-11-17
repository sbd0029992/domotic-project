import { pool } from "../../../config/db";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return await getPersons(req, res);
    case "DELETE":
      return await deletePerson(req, res);
    case "PUT":
      return await updatePerson(req, res);
  }
}
const getPersons = async (req, res) => {
  const { id } = req.query;
  const [result] = await pool.query(
    "SELECT p.id, p.firstName,p.lastName, p.gender,p.birthDate,u.idHome, u.userName, u.password\
        FROM person p \
        INNER JOIN user u ON  p.id = u.idUser WHERE p.id = ?;",
    [id]
  );
  return res.status(200).json(result[0]);
};
const deletePerson = async (req, res) => {
  const result = await pool.query("DELETE FROM user WHERE idUser = ?", [
    req.query.id,
  ]);
  const result2 = await pool.query("DELETE FROM person WHERE id = ?", [
    req.query.id,
  ]);
  return res.status(200).json(result, result2);
};
const updatePerson = async (req, res) => {
  const { id } = req.query;
  const password = await bcrypt.hash(req.body.password, 10);

  const { firstName, lastName, gender, birthDate, userName } = req.body;

  try {
    await pool.query(
      "UPDATE person SET firstName =?, lastName = ?,  gender =?, birthDate = ?, updateDate=CURRENT_TIMESTAMP  WHERE id = ?",
      [firstName, lastName, gender, birthDate, id]
    );
    await pool.query(
      "UPDATE user SET userName =?, password =?  WHERE idUser = ?",
      [userName, password, id]
    );
    return res.status(204).json();
  } catch (error) {
    console.error(error.message);
  }
};
