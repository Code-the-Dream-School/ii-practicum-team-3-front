import { useEffect, useState, useRef } from 'react';

import { Typography, Container, Box, Skeleton, Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { getWorkoutById } from '../../api/DBRequests';
import WorkoutExerciseCard from '../../components/WorkoutExerciseCard';
import customFetch from '../../api/customFetch';


const CustomWorkout = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const observer = useRef(null);
  const itemsRef = useRef([]);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        const response = await getWorkoutById(id);
        if (response?.success && response.data) {
          setWorkout(response.data);
        } else {
          setError('Workout not found.');
        }
      } catch (err) {
        setError(`Failed to load workout: ${err.message || err}`);
        console.error('API Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkout();
  }, [id]);

  useEffect(() => {
    if (!workout || !workout.exercises) return;

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        } else {
          entry.target.classList.remove('in-view');
        }
      });
    };

    observer.current = new IntersectionObserver(handleIntersection, {
      threshold: 0.1,
    });

    itemsRef.current.forEach((el) => {
      if (el) observer.current.observe(el);
    });

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [workout]);

  const handleBackClick = () => {
    sessionStorage.setItem('scrollToWorkoutCards', 'true');
    const savedPage = sessionStorage.getItem('workoutsPage') || '1';
    navigate(`/workouts?page=${savedPage}`);
  };

  if (loading) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography>Loading...</Typography>
        <Skeleton variant="text" width="60%" height={40} />
        <Skeleton variant="text" width="90%" height={24} sx={{ mb: 2 }} />
        <Skeleton variant="rectangular" height={200} sx={{ mb: 4 }} />
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} variant="text" height={24} sx={{ mb: 1 }} />
        ))}
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  if (!workout) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography color="error">No workout found</Typography>
      </Container>
    );
  }

  const handleSaveWorkout = async () => {
    try {
      const token = localStorage.getItem('token'); 

      const response = await customFetch.post(
        `/api/v1/customized-workout/save/${workout.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsSaved(true);
      alert('You have added the workout to your profile'); 

    } catch (error) {
      console.error('Error saving workout:', error);
    }
  };

  return (
    <Container sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}></Box>
      <Box sx={{ bgcolor: 'white', p: { xs: 2, sm: 3, md: 4 }, borderRadius: 2, boxShadow: 1 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center' }}>
          Here is your Custom Workout {workout.level} level
        </Typography>

        <Typography variant="h5" gutterBottom sx={{ textAlign: 'center' }}>
          {workout.name}
        </Typography>
        <Typography variant="body1" sx={{ textAlign: 'center' }}>
          {workout.description}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center', // centers horizontally
            width: '100%',
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            disabled={isSaved} 
            sx={{
              textTransform: 'none',
              width: { xs: '100%', sm: '60%', md: '150px' },
              mt: 4,
            }}
            onClick={handleSaveWorkout}
          >
            {isSaved ? 'Added' : 'Add'}
          </Button>
        </Box>

        <Typography variant="h6" mt={4} align="center" padding={2} fontWeight={700}>
          Exercises:
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 4,
            mt: 2,
          }}
        >
          {workout.exercises.map((ex, index) => (
            <Box
              key={index}
              ref={(el) => (itemsRef.current[index] = el)}
              className="exercise-card"
              sx={{
                opacity: 0,
                transition: 'opacity 0.5s ease-out',
                '&.in-view': { opacity: 1 },
              }}
            >
              <WorkoutExerciseCard exercise={ex} />
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default CustomWorkout;
