import { Link,Outlet,useNavigate } from 'react-router-dom';

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
          <nav
          className='flex justify-between items-center'
          >
            <Logout />
            <Link to="boats">Boats</Link>
            <Link to="marins">Marins</Link>
          </nav>
          <main className="min-h-screen bg-gray-100 py-8">
            <Outlet/>
          </main>
        </>
    )
};