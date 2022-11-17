import { pool } from "../config/db";

const databaseServiceFactory = () => {
  const getUser = async (username, home) => {
    const user = await pool.query(
      "SELECT * FROM user WHERE userName = ? and idHome = ? ",
      [username, home]
    );

    if (user[0].length === 0) {
      throw new Error("User not found");
    }
    return user[0][0];
  };
  return { getUser };
};

module.exports = {
  databaseServiceFactory,
};
