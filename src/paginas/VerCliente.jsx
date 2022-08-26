import {useEffect,useState} from 'react'
import {useParams} from 'react-router-dom'
import Spinner from '../components/Spinner'

const VerCliente = () => {
    const [cliente,setCliente] = useState({})
    const [cargando,setCargando] = useState(true)
    const id = useParams().id
    useEffect(()=>{
        const url = `${import.meta.env.VITE_API_URL}/${id}`
        const ObtenerClienteAPI = async () =>{
            try {
                
              const respuesta = await fetch(url)
              const resultado = await respuesta.json()
              setCliente(resultado)       
            } catch (error) {
                console.log(error)
            }
            setTimeout(()=>{
              setCargando(!cargando)
            },2000)
            
        }
        ObtenerClienteAPI()
    },[])
  return (
    <div>
      {cargando ? <Spinner /> : 
        Object.keys(cliente).length === 0 ? <p>No hay resultado</p> : 
        (
        <>
          <h1 className='text-4xl text-blue-900 font-black'>Cliente: {cliente.nombre}</h1>
          <p className='mt-3'>Información del cliente</p>
          <p className='text-4xl text-gray-600 mt-10'>
            <span className='font-bold text-gray-800 uppercase '>Cliente: </span>
            {cliente.nombre}
          </p>
          <p className='text-2xl text-gray-600 mt-4'>
            <span className='font-bold text-gray-800 uppercase '>E-mail: </span>
            {cliente.email}
          </p>
          {cliente.telefono && (
            <p className='text-2xl text-gray-600 mt-4'>
                <span className='font-bold text-gray-800 uppercase '>Teléfono: </span>
                {cliente.telefono}
            </p>
          )}
          
          <p className='text-2xl text-gray-600 mt-4'>
            <span className='font-bold text-gray-800 uppercase '>Empresa: </span>
            {cliente.empresa}
          </p>
          {cliente.nota && (
            <p className='text-2xl text-gray-600 mt-4'>
                <span className='font-bold text-gray-800 uppercase '>Notas: </span>
                {cliente.nota}
            </p>
          )}
        </>
    )}  
    </div>
  )
}

export default VerCliente
