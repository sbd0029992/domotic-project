import axios from "axios";
import { useEffect, useState } from "react";

export const getUser = async () => {
  const [dataUser, setdataUser] = useState([]);
  useEffect(() => {
    const getUser = async () => {
      const { data } = await axios.get("/api/auth/user");
      setdataUser(data);
    };
    getUser();
  }, []);

  return { dataUser };
};

module.exports = {
  getUser,
};
