import { Suspense, useEffect } from "react";
import { Route,Routes, useLocation, useNavigate} from "react-router-dom";
import "./App.css";
import Loader from "./components/loader/Loader";
import { Users, Layout, Login, Order, Product, Category, Profile, Dashboard } from "./routes/Routes";

function App() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  useEffect(() => {
    if (
      
      !sessionStorage.getItem("isLogged")
    ) {
      navigate("/");
    }
    if (pathname == "/" && sessionStorage.getItem("isLogged")) {
      navigate("/dashboard");
    }
  }, [pathname]);
  return (
    <div className="App">
      <Routes>
        <Route
          path="/dashboard"
          element={
            <Suspense fallback={<Loader />}>
              <Layout />
            </Suspense>
          }
        >
          <Route
            path="/dashboard"
            element={
              <Suspense fallback={<Loader />}>
                <Dashboard/>
              </Suspense>
            }
          />
          <Route
            path="users"
            element={
              <Suspense fallback={<Loader />}>
                <Users/>
              </Suspense>
            }
          />
          <Route
            path="category"
            element={
              <Suspense fallback={<Loader />}>
                <Category/>
              </Suspense>
            }
          />
          <Route
            path="order"
            element={
              <Suspense fallback={<Loader />}>
                <Order/>
              </Suspense>
            }
          />
          <Route
            path="product"
            element={
              <Suspense fallback={<Loader />}>
                <Product/>
              </Suspense>
            }
          />
          <Route
            path="profile"
            element={
              <Suspense fallback={<Loader />}>
                <Profile/>
              </Suspense>
            }
          />
        </Route>
        <Route
           path="/"
          element={
            <Suspense fallback={<Loader />}>
              <Login />
            </Suspense>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
