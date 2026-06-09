import {BrowserRouter , Routes,Route,Navigate} from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import DashBoard from "./pages/DashBoard";
import GuestPage from "./pages/GuestPage";

function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GuestPage />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/dashboard" element={<DashBoard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;