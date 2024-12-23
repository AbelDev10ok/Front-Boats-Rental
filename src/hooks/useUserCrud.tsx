import { useState } from "react";
import { fecthupdateEnabledStatus } from "../services/dataUsers";
import User from "../types/UserType";
import useStore from "../store/useStore";

export function useUserCrud(){
    const [users, setUsers] = useState<User[]>([]);
    const [filter, setFilter] = useState<'all' | 'enabled' | 'disabled'>('all');
    
    const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFilter(event.target.value as 'all' | 'enabled' | 'disabled');
    };
    
    const {token} = useStore();


    const changeStateUser = async(email: string) => {
        const preavUsers = [...users];
        // optimista
        const updatedUsers = users.map(user => {
            if (user.email === email) {
                return { ...user, enabled: !user.enabled };
            }
            return user;
        });
        setUsers(updatedUsers);
        try {
            const newEnabledStatus = !users.find(user => user.email === email)?.enabled;
            await fecthupdateEnabledStatus(email, token, newEnabledStatus);
        } catch (error) {
            console.error("Error updating user status:", error);
            alert(`Error al cambiar estado de usuario ${email}: ${error}`)
            setUsers(preavUsers);
        }
    };

    return {users,setUsers,changeStateUser,handleFilterChange,filter}
}