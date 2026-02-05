import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout.jsx";
import LogIn from "./pages/login.jsx";
import SignIn from "./pages/SignIn.jsx";
import Password from "./pages/Password.jsx";
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";
import Juego from "./pages/Juego.jsx";


function App() {
  return (
    <Router>
      <Routes>
        {/*Login (Sin header ni sidebar)*/}
        <Route path="/login" element={<LogIn />} />
        {/*Signin (Sin header ni sidebar)*/}
        <Route path="/signin" element={<SignIn />} />
        {/*Recuperar contraseña (Sin header ni sidebar)*/}
        <Route path="/password" element={<Password />} />
        {/*Inicio (con header y sidebar)*/}
        <Route
          path="/"
          element={
            <AppLayout>
              <Home />
            </AppLayout>
          }
        />
        {/*Juegos (con header y sidebar)*/}
        <Route
          path="/juego"
          element={
            <AppLayout>
              <Juego />
            </AppLayout>
          }
        />
        {/*Perfil del usuario (con header y sidebar)*/}
        <Route
          path="/profile"
          element={
            <AppLayout>
              <Profile />
            </AppLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
