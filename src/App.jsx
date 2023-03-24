import { Suspense, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import Loader from "./components/loader/Loader";
import { Home, Layout, Login, Register } from "./routes/Routes";

function App() {
  // const navigate = useNavigate();
  // const { pathname } = useLocation();
  // useEffect(() => {
  //   if (
  //     (pathname == "/login" || pathname == "/register" ) &&
  //     !sessionStorage.getItem("isLogged")
  //   ) {
  //     navigate("/");
  //   }
  //   if (sessionStorage.getItem("isLogged")) {
  //     navigate("/home");
  //   }
  // }, [pathname]);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <Suspense fallback={<Loader />}><Layout /></Suspense>}>
          <Route index element={<Suspense fallback={<Loader />}><Login /></Suspense>}/>
          <Route path="login" element={<Suspense fallback={<Loader />}><Login /></Suspense>}/>
          <Route path="register" element={<Suspense fallback={<Loader />}><Register /></Suspense>}/>
          <Route path="home" element={<Suspense fallback={<Loader />}><Home /></Suspense>}/>
        </Route>
        
      </Routes>
    </div>
  );
}

export default App;
