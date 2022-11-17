import { databaseServiceFactory } from "../../../services/databaseService";
import { authServiceFactory } from "../../../services/authService";
import withSession from "../../../lib/session";

const dbService = databaseServiceFactory();
const authService = authServiceFactory();

export default withSession(async (req, res) => {
  const ERROR_CREDENTIALS = "Invalid username, password and/or home ";

  const method = req.method.toLowerCase();
  const { username, password, home } = req.body;
  if (method !== "post") {
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const userCredentials = await dbService.getUser(username, home);
    const data = await dbService.getUser(username, home);
    const idUser = data.idUser;
    const idHome = data.idHome;
    const role = data.role;
    if (
      (await authService.validate(password, userCredentials.password)) ===
        true &&
      (home == userCredentials.idHome) === true
    ) {
      await saveSession({ username, idUser, idHome, role }, req);
      res.status(200).json({ username, idUser, idHome, role });
      return;
    }
  } catch (error) {
    console.log("validate: ", error);
  }
  res.status(403).json({ error: ERROR_CREDENTIALS });
});

async function saveSession(user, request) {
  request.session.set("user", user, "idUser");
  await request.session.save();
}
