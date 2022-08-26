import { useNavigate } from 'react-router-dom'

const Cliente = ({cliente, handleEliminar}) => {

    const navigate = useNavigate()

    const {nombre,empresa,email,telefono,nota,id} = cliente
  return (
    <tr className='border-b hover:bg-gray-100'>
        <td className='p-3'>{nombre}</td>
        <td className='p-3'>
            <p><span className='font-bold text-gray-800 uppercase'>Email: </span>{email}</p>
            <p><span className='font-bold text-gray-800 uppercase'>Tel: </span>{telefono}</p>
        </td>
        <td className='p-3'>{empresa}</td>
        <td className='p-3'>
            <button
                type='button'
                className='bg-yellow-600 hover:bg-yellow-700 p-2 block w-full uppercase text-white text-sm font-bold'
                onClick={()=>navigate(`/clientes/${id}`)}
            >Ver</button>
            <button
                type='button'
                className='bg-blue-600 hover:bg-blue-700 p-2 block w-full uppercase text-xs text-white font-bold mt-3'
                onClick={()=>navigate(`/clientes/editar/${id}`)}
            >Editar</button>
            <button
                type='button'
                className='bg-red-600 hover:bg-red-700 block p-2 w-full uppercase text-white font-bold mt-3 text-xs'
                onClick={()=>handleEliminar(id)}
            >Eliminar</button>
        </td>
    </tr>
  )
}

export default Cliente
