import {BrowserRouter , Routes,Route,Navigate} from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import DashBoard from "./components/DashBoard";
import GuestPage from "./components/GuestPage";

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