import Form from './components/Form'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProtectedRoutes from './routes/utils/ProtectedRoutes';
import AdminPanel from './routes/AdminPanel';
import UserPanel from './routes/UserPanel';
import './App.css'
import BoatCRUD from './components/BoatCrud';
import MarinCrud from './components/MarinCrud';


function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route element={<ProtectedRoutes token={true}/>}>
          <Route path='dashboard/admin' element={<AdminPanel/>}>
              <Route path="boats" element={<BoatCRUD />} /> {/* Ruta relativa correcta */}
              <Route path="marins" element={<MarinCrud />} /> {/* Ruta relativa correcta */}
            </Route>   
          </Route>
          <Route element={<ProtectedRoutes token={true}/>}>
              <Route path='dashboard/user' element={<UserPanel/>}/>   
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
