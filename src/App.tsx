import Form from './components/Form'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProtectedRoutes from './components/utils/ProtectedRoutes';
import AdminPanel from './components/AdminPanel';
import UserPanel from './components/UserPanel';
import './App.css'


function App() {



  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route element={<ProtectedRoutes token={true}/>}>
              <Route path='dashboard/admin' element={<AdminPanel/>}/>   
          </Route>
          <Route element={<ProtectedRoutes token={true}/>}>
              <Route path='dashboard/user' element={<UserPanel/>}/>   
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
