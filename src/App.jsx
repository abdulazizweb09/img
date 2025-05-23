import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./page/Home";
import Login from "./page/Login";
import Register from "./page/Register";
import { useDispatch, useSelector } from "react-redux";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { add, remuv, setloading } from "./hooks/setUser";
import { toast } from "sonner";

function App() {
  const { user, loading } = useSelector((state) => state.user);
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let auth = getAuth();

  useEffect(() => {
    dispatch(setloading(true));

    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(add(user));
        // navigate("/");
      } else {
        dispatch(remuv());
        toast.error("User Already Sign Out");
        navigate("/login");
      }
      dispatch(setloading(false));
    });
  }, []);
  return (
    <Routes>
      <Route
        path="/login"
        element={
            <Login />
        }
      />
      <Route
        path="/register"
        element={
            <Register />
        }
      />
      <Route
        path="/"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />
    </Routes>
  );
}

export default App;
