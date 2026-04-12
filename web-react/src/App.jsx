
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from 'react';
import { API_BASE_URL } from './config/api';
import AppLayout from "./components/AppLayout.jsx";
import LogIn from "./pages/LogIn.jsx";
import SignIn from "./pages/SignIn.jsx";
import Password from "./pages/Password.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";
import Game from "./pages/Game.jsx";
import Games from "./pages/Games.jsx";
import Reviews from "./pages/Reviews.jsx";
import Friends from "./pages/Friends.jsx";
import Whishlist from "./pages/Whishlist.jsx";
import ListDetail from "./pages/ListDetail.jsx";

function RequireAuth({ children }) {
  const isAuthenticated = !!localStorage.getItem("user");
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function App() {
  useEffect(() => {
    const url = `${API_BASE_URL}/health`;
    const ping = () => fetch(url, { method: 'GET', cache: 'no-cache' }).catch(() => {});
    ping();
    const id = setInterval(ping, 15000);
    return () => clearInterval(id);
  }, []);
  return (
    <Router>
      <Routes>
        {/*Login (Sin header ni sidebar)*/}
        <Route path="/login" element={<LogIn />} />
        {/*Signin (Sin header ni sidebar)*/}
        <Route path="/signin" element={<SignIn />} />
        {/*Recuperar contraseña (Sin header ni sidebar)*/}
        <Route path="/password" element={<Password />} />
        {/*Cambiar contraseña con token (Sin header ni sidebar)*/}
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        {/*Inicio (con header y sidebar)*/}
        <Route
          path="/"
          element={
            <RequireAuth>
              <AppLayout>
                <Home />
              </AppLayout>
            </RequireAuth>
          }
        />
        {/*Perfil del usuario (con header y sidebar)*/}
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <AppLayout>
                <Profile />
              </AppLayout>
            </RequireAuth>
          }
        />
        {/*Perfil de otro usuario (con header y sidebar)*/}
        <Route
          path="/user/:id"
          element={
            <RequireAuth>
              <AppLayout>
                <Profile />
              </AppLayout>
            </RequireAuth>
          }
        />
        {/*Listado de juegos (con header y sidebar)*/}
        <Route
          path="/games"
          element={
            <RequireAuth>
              <AppLayout>
                <Games />
              </AppLayout>
            </RequireAuth>
          }
        />
        {/*Detalle de juego (con header y sidebar)*/}
        <Route
          path="/game/:id"
          element={
            <RequireAuth>
              <AppLayout>
                <Game />
              </AppLayout>
            </RequireAuth>
          }
        />
        {/*Reviews (con header y sidebar)*/}
        <Route
          path="/reviews"
          element={
            <RequireAuth>
              <AppLayout>
                <Reviews />
              </AppLayout>
            </RequireAuth>
          }
        />
        {/*Amigos (con header y sidebar)*/}
        <Route
          path="/friends"
          element={
            <RequireAuth>
              <AppLayout>
                <Friends />
              </AppLayout>
            </RequireAuth>
          }
        />
        {/*Whishlist (con header y sidebar)*/}
        <Route
          path="/whishlist"
          element={
            <RequireAuth>
              <AppLayout>
                <Whishlist />
              </AppLayout>
            </RequireAuth>
          }
        />
        {/*Detalle de lista (con header y sidebar)*/}
        <Route
          path="/list/:id"
          element={
            <RequireAuth>
              <AppLayout>
                <ListDetail />
              </AppLayout>
            </RequireAuth>
          }
        />
        {/*Cualquier otra ruta redirige al login*/}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
