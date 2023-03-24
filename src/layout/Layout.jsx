
import { Button } from 'antd'
import React from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import CakeIcon from '@mui/icons-material/Cake';
import LogoutIcon from '@mui/icons-material/Logout';
import { destroyToken } from '../utils/axiosRequest';
const Layout = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (<div>

    <div className='container'>
    <div className='navbar sticky z-10 flex justify-evenly m-auto py-[10px] bg-black'>
            
            <h1 className='text-[30px] text-[#F7DF1E] font-[700]'>Welcome<CakeIcon/></h1>
            <div className='local flex gap-[20px]'>
            <div className='flex gap-[20px]'>
                <div className='flex'> 
                {sessionStorage.getItem("isLogged") ? <Button onClick={() => {
                    destroyToken()
                    navigate("/")
                } }>log out <LogoutIcon/></Button> :                <div className='flex'> 
                <Link to={"/login"}>
                <Button className='bg-[#F7DF1E] font-[600] h-[35px] mt-[10px] mr-[20px] '>
                 Login&nbsp;<ExitToAppIcon /></Button>
                </Link>
                <Link to={"/register"}>
                <Button className='bg-[#F7DF1E] font-[600] h-[35px] mt-[10px]'>Register&nbsp;<HowToRegIcon /></Button>
                </Link>
                </div> }
                </div>
            </div>
            </div>
        </div>
    </div>
    <Outlet/>
  </div>
  )
}

export default Layout