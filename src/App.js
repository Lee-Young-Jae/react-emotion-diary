import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// COMPONENTS
import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";

//process.env.PUBLIC_URL

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home></Home>} />
          <Route path="/new" element={<New></New>} />
          <Route path="/edit/:id" element={<Edit></Edit>} />
          <Route path="/diary/:id" element={<Diary></Diary>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
