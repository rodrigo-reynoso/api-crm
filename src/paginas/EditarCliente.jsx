import { useEffect,useState } from "react"
import { useParams } from "react-router-dom"
import Formulario from "../components/Formulario"

const EditarCliente = () => {
  const [cliente,setCliente] = useState({})
  const [cargando,setCargando] = useState(true) 
  const id = useParams().id
  
  useEffect( ()=>{
    const obtenerCliente = async ()=>{
      const url = `http://localhost:4000/clientes/${id}`
      
      try {
        const respuesta = await fetch(url)
        const resultado = await respuesta.json()
        setCliente(resultado)
      } catch (error) {
        console.log(error)
      }
      setCargando(!cargando)
    }
    obtenerCliente();
  },[])
  return (
    <>
      <h1 className='text-4xl text-blue-900 font-black'> Editar Cliente</h1>
      <p className='mt-3'>Utiliza este formulario para editar datos de un cliente</p>
      {cliente?.nombre ? ( 
        <Formulario 
          cliente={cliente}
          cargando={cargando}
        />
        ) : <p>Cliente no válido</p>}

    </>
  )
}

export default EditarCliente