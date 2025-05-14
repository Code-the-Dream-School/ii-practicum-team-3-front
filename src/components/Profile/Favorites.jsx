import { useEffect, useState } from 'react';

import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import { Card, CardContent, Typography, Box, Button, Stack, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { getSavedWorkouts, getSavedExercises } from '../../api/DBRequests';


const MiniCard = ({ title }) => (
  <Paper
    elevation={3}
    sx={{
      p: 1.5,
      borderRadius: 1,
      bgcolor: '#f4f4f4',
      fontSize: '0.9rem',
      textAlign: 'center',
    }}
  >
    🏃‍♂️ {title}
  </Paper>
);

const Favorites = () => {
  const navigate = useNavigate();
  const [favoriteWorkouts, setFavoriteWorkouts] = useState([]);
  const [favoriteExercises, setFavoriteExercises] = useState([]);


  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const [workoutsRes, exercisesRes] = await Promise.all([
          getSavedWorkouts(1, 1000, { isTemplate: false }),
          getSavedExercises(1, 1000),
        ]);

        if (workoutsRes.success) {
          setFavoriteWorkouts(workoutsRes.data);
        }

        if (exercisesRes.success) {
          setFavoriteExercises(exercisesRes.data);
        }
      } catch (error) {
        console.error('Failed to fetch favorites:', error);
      }
    };

    fetchFavorites();
  }, []);


  return (
    <Card 
      sx={{
        height: '100%',
        px: '3em',
        py: '1em',
      }}
    >
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Favorites
        </Typography>
        <Box sx={{ border: '1px solid #e1e0e2', borderRadius: 2, mt: 2, mb: 2, px: 3, py: 3 }}>
          <Typography
            variant="body1"
            align="left"
            sx={{
              mt: 3,
              mb: 1,
              fontWeight: 'bold',
              py: '1em',
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <FitnessCenterIcon fontSize="small" color="action" />
            Exercises:
            <Box
              component="span"
              sx={{
                ml: 1,
                bgcolor: '#e0e0e0',
                borderRadius: '12px',
                px: 1.2,
                fontSize: '0.8em',
                color: '#555',
              }}
            >
              {favoriteExercises.length}
            </Box>
          </Typography>
          <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
            {favoriteExercises.slice(0, 4).map((ex) => (
              <MiniCard key={ex._id} title={ex.name} />
            ))}
          </Stack>
          <Button
            variant="contained"
            sx={{
              mt: 4,
            }}
            onClick={() => navigate('/exercises/favorites')}
          >
            View All Exercises
          </Button>
        </Box>
        <Box sx={{ border: '1px solid #e1e0e2', borderRadius: 2, px: 3, py: 3 }}>
          <Typography
            variant="body1"
            align="left"
            sx={{
              mt: 3,
              mb: 1,
              fontWeight: 'bold',
              py: '1em',
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <FitnessCenterIcon fontSize="small" color="action" />
            Workouts:
            <Box
              component="span"
              sx={{
                ml: 1,
                bgcolor: '#e0e0e0',
                borderRadius: '12px',
                px: 1.2,
                fontSize: '0.8em',
                color: '#555',
              }}
            >
              {favoriteWorkouts.length}
            </Box>
          </Typography>
          <Stack
            direction="row"
            gap={2}
            spacing={1}
            sx={{ mb: 2, display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}
          >
            {favoriteWorkouts.slice(0, 5).map((w) => (
              <MiniCard key={w._id} title={w.title || w.name} />
            ))}
          </Stack>
          <Button
            variant="contained"
            sx={{ mt: 4 }}
            onClick={() => navigate('/workouts/favorites')}
          >
            View All Workouts
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Favorites;

