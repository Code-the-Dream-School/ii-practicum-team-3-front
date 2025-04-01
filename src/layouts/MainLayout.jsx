import { Outlet } from "react-router-dom";
import Header from './Header';
import Navbar from "./NavBar";
import ScrollToTopButton from "../layouts/ScrollToTopButton"; 
import Footer from "./Footer";


function MainLayout() {
    return (
        <>
            <header>
                <Header />
                {/* <Navbar /> */}
            </header>
            <main>
                <ScrollToTopButton />
                <Outlet /> {/* Content of the Pages */}
            </main>
            <Footer />
        </>
    );
}

export default MainLayout;
