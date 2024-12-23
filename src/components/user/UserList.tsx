import User from "../../types/UserType";
import UserItem from "./UserItem";

interface UserListProps {
    users: User[];
    onDelete: (id: string) => void;
    filter: 'all' | 'enabled' | 'disabled';
}

export default function UserList({users,onDelete,filter}: UserListProps){
    
  const filteredUsers = users.filter(user => {
    if (filter === 'all') return true;
    if (filter === 'enabled') return user.enabled;
    if (filter === 'disabled') return !user.enabled;
    return true;
  });

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredUsers.map(user => (
          <UserItem
            key={user.email}
            user={user}
            onDelete={onDelete}
          />
        ))}
        </div>
    )
}
  