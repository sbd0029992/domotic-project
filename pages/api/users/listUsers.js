import mysql2 from "mysql2/promise";
export default async (req, res) => {
    const connection = await mysql2.createConnection({
            host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    port: 3306,
    database: process.env.MYSQL_DATABASE,
    });
    try {
        const query = "SELECT idUser,role FROM user ORDER BY role";
        const values = [];
        const [data] = await connection.execute(query, values);
        res.status(200).json({ users: data });
    } catch (error) {
        res.json({ error: error.message });
    } finally {
        connection.end();
    }
};