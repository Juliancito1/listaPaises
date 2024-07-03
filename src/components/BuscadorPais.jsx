import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { buscarPais } from '../slices/paisesSlice'

export const BuscadorPais = () => {

    const [pais, setPais] = useState('');
    const dispatch = useDispatch();
    const paisObtenido = useSelector((state) => state.paises.pais);
    console.log(paisObtenido)
    const handleBuscar = (e) => {
        e.preventDefault();
        dispatch(buscarPais(pais));
    }
  return (
    <div>
      <form onSubmit={handleBuscar}>
        <label>Nombre del Pais</label>
        <input type="text" onChange={(e) => setPais(e.target.value)}/>

        <button type="submit">Buscar</button>
      </form>

      {pais && (
          <div>
            <h2>{paisObtenido?.name.common}</h2>
            <p>Poblacion: {paisObtenido?.population}</p>
            <p>Region: {paisObtenido?.region}</p>
            <p>Capital: {paisObtenido?.capital[0]}</p>
            <img src={paisObtenido?.flags.png} alt={paisObtenido?.name.common} />
        </div>)}
    </div>
  )
}

export default BuscadorPais
