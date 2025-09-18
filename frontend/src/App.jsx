import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ThreeDViewer from "./pages/ThreeDViewer";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/viewer/:id" element={<ThreeDViewer />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;

