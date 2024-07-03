import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPaises } from "../slices/paisesSlice";

const PaisesLista = () => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.paises.status);
  const pais = useSelector((state) => state.paises.paises);
  const error = useSelector((state) => state.paises.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(getPaises());
    }
  }, []);

  let content;

  if (status === "Cargando") {
    content = <p>Cargando...</p>;
  } else if (status === "Exitoso") {
    content = (
      <ul>
        {pais.map((pais) => (
          <li key={pais.cca2}>{pais.name.common}</li>
        ))}
      </ul>
    );
  } else if (status === "Denegado") {
    content = <p>{error}</p>;
  }

  return <>{content}</>;
};

export default PaisesLista;
