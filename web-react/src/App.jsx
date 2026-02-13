
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout.jsx";
import LogIn from "./pages/LogIn.jsx";
import SignIn from "./pages/SignIn.jsx";
import Password from "./pages/Password.jsx";
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";
import Game from "./pages/Game.jsx";
import Reviews from "./pages/Reviews.jsx";
import Friends from "./pages/Friends.jsx";
import Whishlist from "./pages/Whishlist.jsx";

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
        {/*Perfil del usuario (con header y sidebar)*/}
        <Route
          path="/profile"
          element={
            <AppLayout>
              <Profile />
            </AppLayout>
          }
        />
        {/*Juegos (con header y sidebar)*/}
        <Route
          path="/game"
          element={
            <AppLayout>
              <Game />
            </AppLayout>
          }
        />
        {/*Reviews (con header y sidebar)*/}
        <Route
          path="/reviews"
          element={
            <AppLayout>
              <Reviews />
            </AppLayout>
          }
        />
        {/*Amigos (con header y sidebar)*/}
        <Route
          path="/friends"
          element={
            <AppLayout>
              <Friends />
            </AppLayout>
          }
        />
        {/*Whishlist (con header y sidebar)*/}
        <Route
          path="/whishlist"
          element={
            <AppLayout>
              <Whishlist />
            </AppLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
