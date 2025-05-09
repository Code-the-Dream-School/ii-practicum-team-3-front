import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import NotFoundImage from "../../images/404.png";

function NotFound() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "calc(100vh - 160px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "primary.main",
        gap: 4,
        py: 4,
      }}
    >
      <Box
        component="img"
        src={NotFoundImage}
        alt="404 Not Found"
        sx={{
          width: { xs: "90%", sm: "400px", md: "500px" },
          objectFit: "contain",
          mt: { xs: -2, md: -4 },
        }}
      />
      <Button onClick={() => navigate("/")}>Back to Home</Button>
    </Box>
  );
}

export default NotFound;
