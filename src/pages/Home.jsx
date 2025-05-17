import { Box, Typography, Button, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Home() {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box sx={{ m: 0, p: 0 }}>
      {/* Hero section */}
      <Box sx={{ position: 'relative', height: '520px', overflow: 'hidden' }}>
        {/* Green base */}
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundColor: theme.palette.secondary.main,
            zIndex: 1,
          }}
        />
        {/* Diagonal dark overlay */}
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            height: '120%',
            clipPath: 'polygon(0 0, 100% 0, 100% 30%, 0 100%)',
            backgroundColor: theme.palette.primary.main,
            zIndex: 2,
          }}
        />
        {/* Content */}
        <Box
          sx={{
            position: 'relative',
            zIndex: 3,
            height: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            px: { xs: 2, md: 6 },
            flexWrap: 'wrap',
            pb: 4,
          }}
        >
          {/* Left text */}
          <Box
            sx={{
              color: theme.palette.common.white,
              mb: 'auto',
              pt: 6,
              pl: { xs: 4, md: 8 },
            }}
          >
            <Typography variant="h3" fontWeight="bold">
              970+
            </Typography>
            <Typography variant="h5" fontWeight="medium">
              Members Joined
            </Typography>
            <Button onClick={() => navigate('/register')} sx={{ mt: theme.spacing(2) }}>
              Join Now
            </Button>
          </Box>

          {/* Top-right label */}
          <Typography
            variant="h6"
            sx={{
              position: 'absolute',
              top: 24,
              right: 40,
              color: theme.palette.common.white,
              fontWeight: 'bold',
              zIndex: 4,
            }}
          >
            135+ Fitness Programs
          </Typography>
        </Box>
      </Box>

      {/* Characters on green border - responsive position */}
      <Box
        sx={{
          position: 'relative',
          height: 0,
          zIndex: 3,
          overflow: 'visible',
          width: '100%',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}
        >
          <Box
            component="img"
            src="./src/assets/images/man_woman.png"
            alt="Fitness Man and Woman"
            sx={{
              width: '100%',
              maxWidth: { xs: '240px', sm: '300px', md: '400px' },
              height: 'auto',
              objectFit: 'contain',
            }}
          />
        </Box>
      </Box>

      {/* How to start */}
      <Box
        sx={{
          py: 6,
          px: 2,
          textAlign: 'center',
          backgroundColor: '#f9f9f9',
        }}
      >
        <Typography variant="h6" fontWeight="bold" mb={4}>
          How to start ?
        </Typography>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 2,
            flexWrap: 'wrap',
          }}
        >
          {[
            'Sign Up & Set Up Your Profile',
            'Start with Workout',
            'Get Your Custom Workout',
            'Manage Your Workouts and Exercises',
          ].map((step, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                flex: '1 1 240px',
                height: '64px',
                backgroundColor: theme.palette.secondary.main,
                color: theme.palette.primary.main,
                px: 3,
                py: 2,
                fontWeight: 'bold',
                borderRadius: '10px',
                minWidth: '240px',
                maxWidth: '240px',
                width: '100%',
              }}
            >
              <Typography sx={{ fontSize: '0.9rem', fontWeight: 'bold' }}>
                {step}
              </Typography>
              <Box
                component="span"
                sx={{
                  display: 'inline-block',
                  width: 0,
                  height: 0,
                  borderLeft: '10px solid black',
                  borderTop: '8px solid transparent',
                  borderBottom: '8px solid transparent',
                  ml: 2,
                }}
              />
            </Box>
          ))}
        </Box>
      </Box>

      {/* Why choose us */}
      <Box
        sx={{
          py: 6,
          px: 2,
          backgroundColor: '#f3f3f3',
          textAlign: 'center',
        }}
      >
        <Typography variant="h6" fontWeight="bold" mb={4}>
          Why Choose Our Fitness App?
        </Typography>

        <Box
          sx={{
            maxWidth: 600,
            height: 560,
            margin: '0 auto',
            border: '2px solid #ccc',
            borderRadius: '16px',
            padding: 4,
            position: 'relative',
            backgroundColor: '#fff',
            overflow: 'hidden',
          }}
        >
          {/* Star background */}
          <img
            src="./src/assets/images/star-bg.png"
            alt="Decorative Star Shape"
            style={{
              position: 'absolute',
              bottom: '250px',
              left: '42%',
              transform: 'translateX(-50%)',
              width: '250px',
              zIndex: 1,
            }}
          />

          {/* Girl image */}
          <img
            src="./src/assets/images/fitness-girl.png"
            alt="Illustration of Fitness Girl"
            style={{
              position: 'absolute',
              top: '30px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '180px',
              zIndex: 2,
            }}
          />

          {/* Text box */}
          <Box
            sx={{
              backgroundColor: '#44424b',
              color: '#fff',
              borderRadius: '10px',
              padding: 3,
              mt: 30,
              zIndex: 3,
              position: 'relative',
            }}
          >
            <Typography variant="body2" fontWeight="bold">
              1000+ EXERCISES
            </Typography>
            <Typography variant="caption" display="block" mb={2}>
              Find the perfect workout for you
            </Typography>
            <Typography variant="body2" fontWeight="bold">
              Personalized Workouts
            </Typography>
            <Typography variant="caption" display="block" mb={2}>
              Programs tailored to your fitness level
            </Typography>
            <Typography variant="body2" fontWeight="bold">
              Progress & Motivation
            </Typography>
            <Typography variant="caption" display="block">
              Track results, compete, and celebrate achievements
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
