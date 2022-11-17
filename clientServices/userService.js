import axios from "axios";

const userServiceFactory = () => {
  function login(username, password, home) {
    return axios.post(`/api/auth/auth`, { username, password, home });
  }

  return { login };
};

module.exports = {
  userServiceFactory,
};
