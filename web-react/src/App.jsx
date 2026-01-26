import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "./components/applayout.jsx";
import Home from "./pages/home";

function App() {
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;
