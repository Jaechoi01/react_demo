import { Navigate, Outlet ,useLocation } from "react-router-dom";
import { isLoginSelector } from "../common/userAtom";

import Home from '../home';

import { useRecoilState, 
    useRecoilValue
  } from 'recoil';



const ProtectedRoute = ()=>{

    const location = useLocation();

    console.log("protected route 시작" , location.pathname);

    const isLogin = useRecoilValue(isLoginSelector);

    if(isLogin){
        console.log("로그인 되어있음");
        return <Outlet/>
    }
    else
    {
        console.log("로그인 안되었으니 / 로 이동..")
        //return <Outlet/>
        if('/' === location.pathname){
            return <Outlet/>
        }
        else
        {
            return <Navigate to='/' />
        }
    }
}

export default ProtectedRoute;