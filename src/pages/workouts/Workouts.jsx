import { useEffect, useState } from 'react';

import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { getCustomWorkouts } from '../../api/DBRequests';
import Banner from '../../assets/images/Banner.png';
import AllWorkouts from '../../components/AllWorkouts';
import BeginnerWorkouts from '../../components/BeginnerWorkouts';

const Workouts = () => {
  const navigate = useNavigate();
  const [hasCustomWorkout, setHasCustomWorkout] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkCustomWorkout = async () => {
      try {
        const response = await getCustomWorkouts();
        if (response?.success && Array.isArray(response.data) && response.data.length > 0) {
          setHasCustomWorkout(true);
        }
      } catch (error) {
        console.error('Failed to check for custom workouts:', error);
      } finally {
        setLoading(false);
      }
    };

    checkCustomWorkout();
  }, []);

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f9f9f9' }}>
      <Box sx={{ position: 'relative', width: '100%', mb: 4 }}>
        <img
          src={Banner}
          alt="Workout banner"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: '60%',
            left: '30%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1,
          }}
        >
          <Button
            onClick={() => navigate('/workouts/create')}
            variant="contained"
            color="secondary"
            disabled={hasCustomWorkout || loading}
            sx={{
              px: { xs: 2, sm: 3, md: 5 },
              py: { xs: 1, sm: 1.5, md: 2 },
              fontSize: { xs: '0.7rem', sm: '1rem', md: '1.3rem' },
              backgroundColor: (theme) =>
                hasCustomWorkout || loading
                  ? theme.palette.secondary.main + '90'
                  : theme.palette.secondary.main,
              color: '#fff',
              '&:disabled': {
                backgroundColor: (theme) => theme.palette.secondary.main + '90',
                color: '#ffffffcc',
              },
            }}
          >
            {loading
              ? 'Checking...'
              : hasCustomWorkout
              ? 'Custom Workout Already Exists'
              : 'Create Custom Workout'}
          </Button>
        </Box>
      </Box>
      <AllWorkouts />
      <BeginnerWorkouts />
    </Box>
  );
};

export default Workouts;
