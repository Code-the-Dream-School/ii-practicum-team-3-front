import { Box, Typography, Button, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Home() {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box sx={{ m: 0, p: 0 }}>
      {/* Hero section */}
      <Box sx={{ position: 'relative', height: '500px', overflow: 'hidden' }}>
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
            height: '100%',
            clipPath: 'polygon(0 0, 100% 0, 100% 20%, 0 100%)',
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

          {/* Right characters */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-end',
              gap: { xs: 2, md: 1 },
              flex: 1,
              justifyContent: 'center',
            }}
          >
            <img
              src="/images/fitness-man.png"
              alt="Fitness Man"
              style={{
                width: '260px',
                maxWidth: '30vw',
                height: 'auto',
                objectFit: 'contain',
              }}
            />
            <img
              src="/images/fitness-woman.png"
              alt="Fitness Woman"
              style={{
                width: '260px',
                maxWidth: '30vw',
                height: 'auto',
                objectFit: 'contain',
              }}
            />
          </Box>

          {/* Top-right label */}
          <Typography
            variant="h6"
            sx={{
              position: 'absolute',
              top: 24,
              right: 40,
              color: theme.palette.primary.main,
              fontWeight: 'bold',
              zIndex: 4,
            }}
          >
            135+ Fitness Programs
          </Typography>
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
            alignItems: 'center',
          }}
        >
          {[
            'Sign Up & Set Up Your Profile',
            'Start with Workout',
            'Customize your personal plan',
            'Track your program',
          ].map((step, index, arr) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
              <Box
                sx={{
                  backgroundColor: theme.palette.secondary.main,
                  color: theme.palette.primary.main,
                  px: 3,
                  py: 2,
                  fontWeight: 'bold',
                  borderRadius: '10px',
                  minWidth: '220px',
                  textAlign: 'center',
                }}
              >
                {step}
              </Box>
              {index < arr.length - 1 && (
                <Box
                  sx={{
                    width: 0,
                    height: 0,
                    borderLeft: '10px solid black',
                    borderTop: '8px solid transparent',
                    borderBottom: '8px solid transparent',
                    ml: 1,
                    mr: 1,
                  }}
                />
              )}
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
            src="/images/star-bg.png"
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
            src="/images/fitness-girl.png"
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
