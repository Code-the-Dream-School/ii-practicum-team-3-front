import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";
import ScrollToTopButton from "./ScrollToTopButton";

function MainLayout() {
  return (
    <>
      <Box sx={{ height: "120px" }}>
        <Header />
      </Box>

      {/* main content takes the rest of the screen minus 200px */}
      <Box
        component="main"
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "calc(100vh - 200px)", // 120 header + 80 footer
          overflow: "auto",
        }}
      >
        <ScrollToTopButton />
        <Box sx={{ flex: 1 }}>
          <Outlet />
        </Box>
      </Box>

      <Box sx={{ height: "80px" }}>
        <Footer />
      </Box>
    </>
  );
}

export default MainLayout;
