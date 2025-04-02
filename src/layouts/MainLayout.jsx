import { Outlet } from "react-router-dom";
import Header from './Header';
import ScrollToTopButton from "../layouts/ScrollToTopButton"; 
import Footer from "./Footer";


function MainLayout() {
  return (
    <>
      <Header />
      <main>
        <ScrollToTopButton />
        <Outlet /> {/* Content of the Pages */}
      </main>
      <Footer />
    </>
  );
}

export default MainLayout;
