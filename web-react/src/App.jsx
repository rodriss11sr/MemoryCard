import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "./components/applayout.jsx";
import Login from "./pages/login.jsx";
import Signin from "./pages/signin.jsx";
import Home from "./pages/home.jsx";
import Perfil from "./pages/perfil.jsx";


function App() {
  return (
    <Router>
      <Routes>
        {/*Login (Sin header ni sidebar)*/}
        <Route path="/login" element={<Login />} />
        {/*Signin (Sin header ni sidebar)*/}
        <Route path="/signin" element={<Signin />} />
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
          {/*<Route 
            path="/juegos" 
            element={
              <AppLayout>
                <Juegos />
              </AppLayout>
            } 
          />*/}
          {/*Perfil del usuario (con header y sidebar)*/}
          <Route 
            path="/perfil" 
            element={
              <AppLayout>
                <Perfil />
              </AppLayout>
            } 
          />
      </Routes>
    </Router>
  );
}

export default App;
