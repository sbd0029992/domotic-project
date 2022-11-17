export default async function apiRouteName(req, res) {
  //way of getting the token totally depends on your preference
  let token =
    req.cookies.jwtToken || req.headers.jwtToken || req.query.jwtToken;

  if (!token) {
    return res.status(401).json({ message: "you are not allowed" });
  }

  let data = {}; //store your data in  this variable
  return res.status(200).json({ data });
}
