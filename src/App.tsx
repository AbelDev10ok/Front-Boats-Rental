import Form from './components/Form'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProtectedRoutes from './routes/utils/ProtectedRoutes';
import AdminPanel from './routes/AdminPanel';
import UserPanel from './routes/UserPanel';
import BoatCRUD from './components/boat/BoatCrud';
import MarinCrud from './components/marin/MarinCrud';
import UserCrud from './components/user/UserCrud';
import RentalCrud from './components/rental/RentalCrud';
import BoatAdd from './components/boat/BoatAdd';
import MarinAdd from './components/marin/MarinAdd';


function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route element={<ProtectedRoutes token={true}/>}>
          <Route path='dashboard/admin' element={<AdminPanel/>}>
              <Route path="boats" element={<BoatCRUD />} />
              <Route path="add-boat" element={<BoatAdd/>} />
              <Route path="marins" element={<MarinCrud />} />
              <Route path="add-marin" element={<MarinAdd/>} />
              <Route path="users" element={<UserCrud/>} />
              <Route path="rentals" element={<RentalCrud/>} />
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
