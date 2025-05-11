import { useState, useEffect, useRef } from 'react';

import { Box, Container, Typography, Pagination, Skeleton, Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

import { getSavedWorkouts } from '../../api/DBRequests';
import WorkoutCard from '../WorkoutCard';


const FavoriteWorkoutsList = () => {
  const [page, setPage] = useState(() => {
    const saved = sessionStorage.getItem('favoriteWorkoutsPage');
    return saved ? parseInt(saved, 10) : 1;
  });

  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState('');
  const workoutListRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const backPath = location.state?.from || '/profile';

  const handlePageChange = (event, value) => {
    setPage(value);
    sessionStorage.setItem('favoriteWorkoutsPage', value);
  };

  const fetchWorkouts = async () => {
    try {
      setLoading(true);
      const data = await getSavedWorkouts(page, 10, { isTemplate: false });
      if (data.data.length === 0) {
        setWorkouts([]);
        setTotalPages(1);
      } else {
        setWorkouts(data.data);
        setTotalPages(data.totalPages);
      }
    } catch (error) {
      console.error('Failed to fetch favorite workouts:', error);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, [page]);

  useEffect(() => {
    if (sessionStorage.getItem('scrollToFavoriteWorkoutCards') === 'true') {
      workoutListRef.current?.scrollIntoView({ behavior: 'smooth' });
      sessionStorage.removeItem('scrollToFavoriteWorkoutCards');
    }
  }, []);

  const handleWorkoutClick = (workoutId) => {
    sessionStorage.setItem('favoriteWorkoutsPage', page);
    sessionStorage.setItem('scrollToFavoriteWorkoutCards', 'true');
    navigate(`/workouts/${workoutId}`, {
      state: { from: location.pathname },
    });
  };

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', minHeight: '85vh' }}>
      <Box sx={{ px: { xs: 2, sm: 4, md: 6 }, py: { xs: 2, sm: 3, md: 6 } }}>
        <Button
          variant="outlined"
          color="primary"
          sx={{
            mb: 2,
            textTransform: 'none',
            alignSelf: { xs: 'center', md: 'flex-start' }
          }}
          onClick={() => navigate(backPath)}

        >
          ← Back to Profile
        </Button>

        <Typography
          variant="h4"
          align="center"
          sx={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' } }}
        >
          Favorite Workouts:
        </Typography>
      </Box>
      <Box
        id="workout-list"
        ref={workoutListRef}
        sx={{
          flexGrow: 1,
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: 4,
          mt: 4,
        }}
      >
        {loading ? (
          [...Array(4)].map((_, index) => (
            <Skeleton key={index} variant="rectangular" height={300} sx={{ borderRadius: 2 }} />
          ))
        ) : workouts.length > 0 ? (
          workouts.map((workout, index) => (
            <Box
              key={workout._id}
              onClick={() => handleWorkoutClick(workout._id)}
              sx={{ cursor: 'pointer' }}
            >
              <WorkoutCard id={workout._id} name={workout.name} index={index} />
            </Box>
          ))
        ) : (
          <Typography variant="h6" align="center" sx={{ gridColumn: '1 / -1' }}>
            No favorite workouts found.
          </Typography>
        )}
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
          sx={{ mb:4}}
        />
      </Box>
    </Container>
  );
};

export default FavoriteWorkoutsList;
