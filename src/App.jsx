import { BrowserRouter,Routes,Route } from 'react-router-dom'
import IniciarSesion from './layout/Iniciarsesion'
import Layout from './layout/layout'
import Inicio from './paginas/Inicio'
import LoginForm from './paginas/LoginForm'
import NuevoCliente from './paginas/NuevoCliente'
import EditarCliente from './paginas/EditarCliente'
import VerCliente from './paginas/VerCliente'
function App() {
  

  return (
   <BrowserRouter>
        <Routes>
            {/* Un grupo de rutas masterpage IniciarSesion */}
            {/*<Route path="/" element={<IniciarSesion />}>
                  <Route index element={<LoginForm />} />
            </Route>*/}
            
            {/* Otro grupo de rutas el masterpage es Layout*/}
            <Route path="/clientes" element={<Layout />}>
                  <Route  index element={<Inicio />} /> {/* va estar en la pagina de inicio por el index*/}
                  <Route path='nuevo' element={<NuevoCliente />}/>
                  <Route path='editar/:id' element={<EditarCliente />}/>
                  <Route path=':id' element={<VerCliente />}/>
            </Route>
        </Routes>
   </BrowserRouter>
  )
}

export default App
