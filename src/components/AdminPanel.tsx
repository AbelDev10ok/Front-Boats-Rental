import { useNavigate } from 'react-router-dom';
import BoatCRUD from './BoatCrud';

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear(); // Clear all local storage
    navigate('/'); // Redirect to the login form
  };

  return (
    <button onClick={handleLogout}>Logout</button> // Or a Link, styled as needed
  );
}

export default function AdminPanel(){
    return (
        <>  
          <nav>
            <Logout />
          </nav>
          <main className="min-h-screen bg-gray-100 py-8">
            <BoatCRUD />
          </main>
        </>
    )
};