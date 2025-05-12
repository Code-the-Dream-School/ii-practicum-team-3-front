import { useState, useEffect, useRef } from 'react';

import { Box, Container, Typography, Pagination, Skeleton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import WorkoutCard from './WorkoutCard';
import { getWorkouts } from '../api/DBRequests';

const AllWorkouts = () => {
  const [page, setPage] = useState(() => {
    const saved = sessionStorage.getItem('workoutsPage');
    return saved ? parseInt(saved, 10) : 1;
  });

  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState('');
  const workoutListRef = useRef(null);
  const navigate = useNavigate();

  const handlePageChange = (event, value) => {
    setPage(value);
    sessionStorage.setItem('workoutsPage', value);
  };

  const fetchWorkouts = async () => {
    try {
      setLoading(true);
      const data = await getWorkouts(page, 4);
      // console.log('Workout list:', data.data);
      if (data.data.length === 0) {
        setWorkouts([]);
        setTotalPages(1);
      } else {
        setWorkouts(data.data);
        setTotalPages(data.totalPages);
      }
    } catch (error) {
      console.error('Failed to fetch workouts:', error);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, [page]);

  useEffect(() => {
    if (sessionStorage.getItem('scrollToWorkoutCards') === 'true') {
      workoutListRef.current?.scrollIntoView({ behavior: 'smooth' });
      sessionStorage.removeItem('scrollToWorkoutCards');
    }
  }, []);

  const handleWorkoutClick = (workoutId) => {
    sessionStorage.setItem('workoutsPage', page);
    sessionStorage.setItem('scrollToWorkoutCards', 'true');
    navigate(`/workouts/${workoutId}`);
  };

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', minHeight: '85vh' }}>
      <Box sx={{ px: { xs: 2, sm: 4, md: 6 }, py: { xs: 2, sm: 3, md: 6 } }}>
        <Typography
          variant="h4"
          align="center"
          sx={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' } }}
        >
          Workouts:
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
              key={workout.id}
              onClick={() => handleWorkoutClick(workout.id)}
              sx={{ cursor: 'pointer' }}
            >
              <WorkoutCard id={workout.id} name={workout.name} index={index} />
            </Box>
          ))
        ) : (
          <Typography variant="h6" align="center" sx={{ gridColumn: '1 / -1' }}>
            No workouts found.
          </Typography>
        )}
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Pagination count={totalPages} page={page} onChange={handlePageChange} color="primary" />
      </Box>
    </Container>
  );
};

export default AllWorkouts;
