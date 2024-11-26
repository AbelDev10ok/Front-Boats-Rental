import {create} from 'zustand'


interface AuthUser {
    id:string
    token:string,
    email:string,
    roles:string[]
    updateUser:() => void
    clearUser: () => void;
}

const useStore = create<AuthUser>((set) => ({
    id:localStorage.getItem('id') ||'',
    token:localStorage.getItem('token') ||'',
    email:localStorage.getItem('email') ||'',
    roles:localStorage.getItem('roles') ? JSON.parse(localStorage.getItem('roles') ||'') : [],
    updateUser: () =>{
        return new Promise<void>((resolve)=> {
            set({
                id: localStorage.getItem('id') ||'',
                token: localStorage.getItem('token') ||'',
                email: localStorage.getItem('email') ||'',
                roles: localStorage.getItem('roles') ? JSON.parse(localStorage.getItem('roles') ||'') : [],
            });
            resolve();
        })
    },
    clearUser: () => set({ id: '', token: '', email: '', roles: [] }),
}))

export default useStore;