import { Outlet } from "react-router-dom";
import HeaderUser from "../components/HeaderUser";
import Footer from "../components/Footer";

export default function UserPanel(){
    return (
            <>
                <HeaderUser/>
                <main className="min-h-screen bg-gray-300">
                <Outlet/>
                </main>
                <Footer/>
            </>
    )
};

