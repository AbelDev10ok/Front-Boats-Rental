import { useEffect, useState } from "react";
import User from "../../types/UserType"
import useStore from "../../store/useStore";
import UserList from "./UserList";
import { fetchAllUsers } from "../../services/dataUsers";
import { useUserCrud } from "../../hooks/useUserCrud";
import Snipper from "../Snipper";

export default function UserCrud(){
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState<string | null>(null);
    const {users,setUsers,changeStateUser,handleFilterChange,filter} = useUserCrud();
    const {token} = useStore();


    useEffect(()=>{
        const getAllUsers = async()=>{
            setLoading(true);
            try {
                const data:User[] = await fetchAllUsers(token);
                setUsers(data);            
            }catch (error) {
                console.error("Error al obtener los mareins: ",error)
                alert("No se pudo obtener los mareins. Por favor, intentalo de nuevo")
                setError("Error al cargar los datos");            
            }finally{
                setLoading(false)
            }
        }
        getAllUsers();
    },[token])

    return (
        <section className="flex flex-col items-center container mx-auto p-4 max-w-4xl">
            <h1 className="text-3xl font-bold mb-6 text-center">Gestión de Usuarios</h1>
            <div className="mb-4 flex justify-center">
            <label className="inline-flex flex-col items-center">
                <span className="mb-2 text-sm font-medium text-gray-700">Filtrar por estado del usuario:</span>
                <select 
                value={filter} 
                onChange={handleFilterChange}
                className="block w-full px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                >
                <option value="all">Todos</option>
                <option value="enabled">Habilitado</option>
                <option value="disabled">Deshabilitado</option>
                </select>
            </label>
            </div>
            {
            loading?
                <Snipper/>
            :error?
                <div>
                <p>{error}</p>
               </div>
            :users && users.length === 0?
                <p>No hay usuarios disponibles</p>
            :
                <UserList
                users={users}
                onDelete={changeStateUser}
                filter={filter}
                />
            }
        </section>
    )
}
