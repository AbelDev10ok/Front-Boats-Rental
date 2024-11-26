import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoutes({token}:{token:boolean}){

    if(token){
        return <Outlet/>
    }
    return <Navigate to='/'/>
}