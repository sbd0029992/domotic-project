import mysql2 from "mysql2/promise";
export default async (req, res) => {
    const connection = await mysql2.createConnection({
        host: "localhost",
        user: "root",
        password: "Univalle19",
        database: "dbdomotica",
    });
    try {
        const query = "SELECT idUser,userName FROM User ORDER BY userName";
        const values = [];
        const [data] = await connection.execute(query, values);
        res.status(200).json({ users: data });
    } catch (error) {
        res.json({ error: error.message });
    } finally {
        connection.end();
    }
};