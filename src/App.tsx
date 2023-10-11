import "./App.css";
import Navbar from "./components/navbar";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <div className="content_container">
        <Outlet />
      </div>
    </>
  );
}

export default App;
