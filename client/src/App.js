import { BrowserRouter, Routes, Route } from "react-router-dom";
import HabitsContainer from "./components/routes/habits";
import UserContainer from "./components/routes/users";
import Login from './components/routes/login/login'
import Register from "./components/routes/register/register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HabitsContainer />} />
        <Route path="/user" element={< UserContainer />} />
        <Route path="/auth/login" element={< Login />} />
        <Route path="/auth/register" element={< Register />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
