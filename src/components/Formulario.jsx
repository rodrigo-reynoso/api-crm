import { Formik, Form, Field } from "formik"
import { Children } from "react"
import { useNavigate } from "react-router-dom"
import * as Yup from 'yup'
import Alerta from "./Alerta"
import Spinner from "./Spinner"

const Formulario = ({cliente,cargando}) => {

    const navegador = useNavigate() // hook de react-router-dom

    const nuevoClienteSchema = Yup.object().shape({
        nombre:Yup.string()
                    .min(3,'El nombre es muy corto')
                    .max(30,'El nombre es muy largo')
                    .required('Es obligatorio el nombre del cliente'),
        empresa:Yup.string()
                    .required('El nombre de la Empresa es obligatorio'),
        email:Yup.string()
                    .email('No valido')
                    .required('El e-mail es obligatorio'),
        telefono:Yup.number()
                    .integer('Número no válido')
                    .positive('Número no válido')
                    .typeError('El número no es válido'),
        nota:''
    })

    const handleSubmit = async(objetoCliente)=>{
        try {
            let respuesta
            if(cliente.id){
               
                // Editando Registro
                const url = `http://localhost:4000/clientes/${cliente.id}`
                respuesta = await fetch(url, {
                        method:'PUT',
                        body: JSON.stringify(objetoCliente),
                        headers:{
                            'Content-Type': 'application/json'
                        }   
                })
                }
            else {
                    // Nuevo Registro
                const url = 'http://localhost:4000/clientes'
                respuesta = await fetch(url, {
                method:'POST',
                body: JSON.stringify(objetoCliente),
                headers:{
                'Content-Type': 'application/json'
                        }   
                })}
             await respuesta.json()
           
            navegador('/clientes')
            console.log(navegador)
            } catch (error) {
                console.log(error)
            } 
    }

  return (
    cargando ? <Spinner /> : ( 
    <div className='bg-white px-10 py-5 rounded-md shadow-md md:w-3/4 mx-auto'>
      <h1 className='text-gray-600 text-xl font-bold text-center uppercase'>{cliente?.nombre ? "Editar cliente" : "Agregar nuevo cliente"}</h1>
      <Formik
        initialValues={{
            nombre:cliente?.nombre ?? '',
            empresa:cliente?.empresa ?? '',
            email:cliente?.email ?? '',
            telefono:cliente?.telefono ?? '',
            nota:cliente?.nota ?? ''
        }}
        enableReinitialize={true}
        onSubmit={ async (objetoCliente, {resetForm})=>{
            console.log(objetoCliente)
             await handleSubmit(objetoCliente)
             resetForm()
        }}
        validationSchema={nuevoClienteSchema}
      >
        { ({errors,touched}) => {
            // errors esta sacado de data de formik y touched da validacion en tiempo real
            //console.log(data)// tiene mucha informacion sobre formik
        return (
            <Form className="mt-10">
                <div className="mb-4">
                    <label htmlFor="nombre" className="text-gray-800">Nombre:</label>
                    <Field
                        id='nombre'
                        type='text'
                        className='mt-2 block w-full p-3 bg-gray-100'
                        placeholder='Nombre del Cliente'
                        name='nombre'
                    />
                </div>
                {errors.nombre && touched.nombre ?(
                    <Alerta>{errors.nombre}</Alerta>
                ) : null}
                <div className="mb-4">
                    <label htmlFor="empresa" className="text-gray-800">Empresa:</label>
                    <Field
                        id='empresa'
                        type='text'
                        className='mt-2 block w-full p-3 bg-gray-100'
                        placeholder='Nombre de la Empresa'
                        name='empresa'
                    />
                </div>
                {errors.empresa && touched.empresa ?(
                    <Alerta>{errors.empresa}</Alerta>
                ) : null}
                <div className="mb-4">
                    <label htmlFor="email" className="text-gray-800">E-mail:</label>
                    <Field
                        id='email'
                        type='email'
                        className='mt-2 block w-full p-3 bg-gray-100'
                        placeholder='E-mail del Cliente'
                        name='email'
                    />
                </div>
                {errors.email && touched.email ?(
                    <Alerta>{errors.email}</Alerta>
                ) : null}
                <div className="mb-4">
                    <label htmlFor="telefono" className="text-gray-800">Telefono:</label>
                    <Field
                        id='telefono'
                        type='tel'
                        className='mt-2 block w-full p-3 bg-gray-100'
                        placeholder='Telefon del Cliente'
                        name='telefono'
                    />
                </div>
                {errors.telefono && touched.telefono ?(
                    <Alerta>{errors.telefono}</Alerta>
                ) : null}
                <div className="mb-4">
                    <label htmlFor="nota" className="text-gray-800">Notas:</label>
                    <Field
                        as='textarea'
                        id='nota'
                        type='text'
                        className='mt-2 block w-full p-3 bg-gray-100 h-40'
                        placeholder='Notas del Cliente'
                        name='nota'
                    />
                </div>
                <input 
                    type="submit"
                    value={cliente?.nombre? "Editar Cliente":"Agregar Cliente"}
                    className="mt-5 w-full bg-blue-800 text-white uppercase p-3 font-bold text-lg" 
                />
            </Form>
        )}}
      </Formik>
    </div>
    )
  )
}
Formulario.defaultProps = {
    cliente: {},
    cargando: false
}
export default Formulario
