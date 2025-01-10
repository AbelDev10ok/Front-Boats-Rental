import {Outlet} from 'react-router-dom';
import HeaderAdmin from '../components/HeaderAdmin';
import Footer from '../components/Footer';



export default function AdminPanel(){
    return (
        <>  
          <HeaderAdmin/>
          <main className="min-h-screen bg-gray-300 py-8">
            <Outlet/>
          </main>
          <Footer/>
        </>
    )
};
