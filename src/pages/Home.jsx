import { Box, Typography, Button, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid';

function Home() {
  const theme = useTheme();

  return (
    <Box>
      {/* Hero section */}
      <Grid container>
        {/* Left side */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: "#fff",
            p: 4,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            minHeight: "400px"
          }}
        >
          <Typography variant="h6">970+ Members Joined</Typography>
          <Button
            variant="contained"
            color="secondary"
            sx={{ width: "fit-content", mt: 2 }}
          >
            Join Now
          </Button>
        </Grid>

        {/* Right side */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            backgroundColor: theme.palette.secondary.main,
            p: 4,
            position: "relative",
            minHeight: "400px",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end"
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              position: "absolute",
              top: 16,
              right: 16,
              color: theme.palette.primary.main
            }}
          >
            135+ Fitness Programs
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexWrap: "wrap",
              justifyContent: "center"
            }}
          >
            <img
              src="/images/fitness-man.png"
              alt="Fitness man"
              style={{ maxHeight: "280px", width: "auto" }}
            />
            <img
              src="/images/fitness-woman.png"
              alt="Fitness woman"
              style={{ maxHeight: "280px", width: "auto" }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Home;