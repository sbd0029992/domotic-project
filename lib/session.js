import { withIronSession } from "next-iron-session";

export default function withSession(handler) {
  return withIronSession(handler, {
    // password: process.env.SECRET_COOKIE_PASSWORD,
    password: "$2a$10$F2JKwZHFAxbzuiob1f986OtOtnSG7",
    cookieName: "root_auth_session",
    // cookieOptions: {
    //   // the next line allows to use the session in non-https environments like
    //   // Next.js dev mode (http://localhost:3000)
    //   secure: true,
    // },
  });
}
