import { BrowserRouter, Routes, Route } from "react-router-dom";
import HabitsContainer from "./components/routes/habits";
import UserContainer from "./components/routes/users";
import AuthContainer from "./components/routes/auth";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HabitsContainer />} />
        <Route path="/user" element={< UserContainer />} />
        <Route path="/auth" element={< AuthContainer />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
