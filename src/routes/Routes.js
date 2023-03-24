import { lazy } from "react";

export const Layout = lazy(()=>import('../layout/Layout.jsx'))
export const Home = lazy(()=>import('../page/home/Home.jsx'))
export const Login = lazy(()=>import('../page/login/Login.jsx'))
export const Register = lazy(()=>import('../page/register/Register.jsx'))

