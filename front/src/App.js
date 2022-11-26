import { Navbar } from "./Components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Register } from "./Pages/Register";
import { Login } from "./Pages/Login";
import { Homepage } from "./Pages/Homepage";
import { User } from "./Pages/User";
import { useContext } from "react";
import { Context } from "./Context/Context";
import { About } from "./Components/About";
import { Contact } from "./Components/Contact";
import { Write } from "./Pages/Write";
import { SinglePage } from "./Pages/SinglePage/SinglePage";
import Settings from "./Pages/Settings/Settings";
function App() {
  const { user } = useContext(Context);
  return (
    <>
      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/write" element={<Write />} />
          <Route exact path="/login" element={user ? <Homepage /> : <Login />} />
          <Route path="/register"element= {user ? <Homepage /> : <Register />}/>
          <Route path="post/:id" element={<SinglePage />} />
          <Route path=":username" element={<User />} />
          <Route path="/settings" element={<Settings />} />

        </Routes>
      </Router>
    </>
  );
}

export default App;
