import { Outlet } from 'react-router-dom';

import Footer from './Footer';
import Header from './Header';
import ScrollToTopButton from '../layouts/ScrollToTopButton';

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
