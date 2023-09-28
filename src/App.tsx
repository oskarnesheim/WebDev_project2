import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/navbar";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <div className="content_container">
        <Outlet />
        <Footer />
      </div>
    </>
  );
}

export default App;
