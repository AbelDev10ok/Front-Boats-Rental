import User from "../../types/UserType";

interface UserItemProps {
    user: User;
    onDelete: (id: string) => void;
}


export default function UserItem({user,onDelete}:UserItemProps){
    
    return (

        <div className="h-min bg-white shadow-md rounded-lg overflow-hidden">

            <div className="flex flex-col justify-center items-start p-7">
                <p className="text-gray-600 mb-1"><strong>{user.email}</strong></p>
                <p className="text-gray-600 mb-1">Roles : {user.roles.map(role => role.name)
                .join(', ')}  </p>
                <p className="text-gray-600 mb-1">Enabled: {user.enabled? 'Habilitado' : 'Desabilitado'}</p>
                <div className="flex justify-between">
                  <button
                    onClick={() => onDelete(user.email)}
                    className={user.enabled
                      ? "bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded text-sm transition duration-300 ease-in-out"
                      :"bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded text-sm transition duration-300 ease-in-out"}
                  >
                    {user.enabled ? 'Desactivar' : 'Activar'}
                  </button>
                </div>
            </div>
        </div>
            )
}