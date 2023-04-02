import { lazy } from "react";

export const Login = lazy(()=>import('../page/login/Login.jsx'))
export const Layout = lazy(()=>import('../page/users/layout/Layout.jsx'))
export const Users = lazy(()=>import('../page/users/Users.jsx'))
export const Order = lazy(()=>import('../page/users/order/Orders.jsx'))
export const Product = lazy(()=>import('../page/users/product/Product.jsx'))
export const Category = lazy(()=>import('../page/users/category/Category.jsx'))
export const Profile = lazy(()=>import('../page/users/profile/Profile.jsx'))
export const Dashboard = lazy(()=>import('../page/dashboard/Dashboard.jsx'))