import React from "react";
import { useRouter } from "next/router";

export default function LenguageSelector() {
  const router = useRouter();
  const changeLang = (e) => {
    console.log(e.target.value);
    router.push(router.pathname, router.pathname, { locale: e.target.value });
  };
  return (
    <select
      style={{ borderRadius: "10px", fontSize: "12px", height: "25px" }}
      onChange={changeLang}
    >
      <option selected value='es'>
        Esp
      </option>
      <option value='en'>Eng</option>
    </select>
  );
}
