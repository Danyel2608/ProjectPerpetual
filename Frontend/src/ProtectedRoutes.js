import { Navigate,Outlet } from "react-router-dom"
import HomePage from "./views/home/HomePage";

const ProtectedRoutes = ({canActive,redirectPath="/"})=>{
    if (!canActive) {
        return <Navigate to={redirectPath} replace />
    }else{
        <HomePage />
    }
}

export default ProtectedRoutes;