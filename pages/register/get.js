import Style from "../../theme/style/PersonRegister";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Link from "next/link";
import axios from "axios";

const useStyles = makeStyles(Style);

function personGet({ person }) {
  const classes = useStyles();
  console.log(person);
  return (
    <Grid>
      {person.map((persons) => (
        <Link href={`/register/${persons.id}`} key={persons.id}>
          <a>
            <div className={classes.divconfig}>
              <table className={classes.tableFormat}>
                <tr>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Genero</th>
                  <th>Fecha de nacimiento</th>
                  <th>Usuario</th>
                  <th>Contraseña</th>
                </tr>
                <tr>
                  <td>{persons.firstName}</td>
                  <td>{persons.lastName}</td>
                  <td>{persons.gender}</td>
                  <td>{persons.birthDate}</td>
                  <td>{persons.userName}</td>
                  <td>{persons.password}</td>
                </tr>
              </table>
            </div>
          </a>
        </Link>
      ))}
    </Grid>
  );
}
export const getServerSideProps = async (context) => {
  const { data: person } = await axios.get(
    "http://localhost:3000/api/personRegister"
  );
  return {
    props: {
      person,
    },
  };
};
export default personGet;
