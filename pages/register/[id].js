import React from "react";
import axios from "axios";
import { useRouter } from "next/router";

function personDetail({ person }) {
  const router = useRouter();
  const handleDelete = async (id) => {
    await axios.delete("/api/personRegister/" + id);
    router.push("/register/get");
  };

  return (
    //formulario para mostrar los datos de la persona
    <div>
      <table>
        <tr>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Genero</th>
          <th>Fecha de nacimiento</th>
          <th>Usuario</th>
          <th>Contraseña</th>
          <th>eliminar</th>
          <th>editar</th>
        </tr>
        <tr>
          <td>{person.firstName}</td>
          <td>{person.lastName}</td>
          <td>{person.gender}</td>
          <td>{person.birthDate}</td>
          <td>{person.userName}</td>
          <td>{person.password}</td>
          <td>
            <button onClick={() => handleDelete(person.id)}>delete</button>
          </td>
          <td>
            {" "}
            <button onClick={() => router.push("/register/edit/" + person.id)}>
              update
            </button>
          </td>
        </tr>
      </table>
    </div>
  );
}
export const getServerSideProps = async (context) => {
  const { data: person } = await axios.get(
    "http://localhost:3000/api/personRegister/" + context.query.id
  );

  return {
    props: { person },
  };
};

export default personDetail;
