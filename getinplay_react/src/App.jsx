import { Outlet } from "react-router-dom";
import Navbar from "./components/Header/Navbar";
import ScrollToTop from "./ScrollToTop";
import FooterSection from "./components/Footer/FooterSection";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <div className="flex flex-col justify-between items-center min-h-[100vh]">
        <ScrollToTop />
        <Navbar />
        <Outlet />
        <FooterSection />
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
