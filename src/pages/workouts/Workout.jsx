import { useEffect, useState, useRef } from 'react';

import { Typography, Container, Box, Skeleton, Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

import { getWorkoutById } from '../../api/DBRequests';
import WorkoutPerson from '../../assets/images/WorkoutPerson.png';
import WorkoutExerciseCard from '../../components/WorkoutExerciseCard';

const Workout = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const observer = useRef(null);
  const itemsRef = useRef([]);

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

  return (
    <Container sx={{ py: 4 }} align="start">
      <Button
        variant="outlined"
        color="primary"
        sx={{ mb: 2, textTransform: 'none', alignSelf: { xs: 'center', md: 'flex-start' } }}
        onClick={handleBackClick}
      >
        ← Back
      </Button>
      <Box sx={{ bgcolor: 'white', p: { xs: 2, sm: 3, md: 4 }, borderRadius: 2, boxShadow: 1 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'column', md: 'row' },
            alignItems: { xs: 'center', md: 'flex-start' },
            gap: { xs: 3, sm: 3, md: 5 },
          }}
        >
          <Box
            component="img"
            src={WorkoutPerson}
            alt="Workout preview"
            sx={{
              width: { xs: '100%', sm: '80%', md: '200px' },
              height: 'auto',
              borderRadius: 2,
              boxShadow: 3,
              objectFit: 'cover',
            }}
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              width: '100%',
              maxWidth: '600px',
            }}
          >
            <Typography variant="h5" gutterBottom>
              {workout.name}
            </Typography>
            <Typography variant="body1">{workout.description}</Typography>
            <Button
              variant="contained"
              color="secondary"
              sx={{
                textTransform: 'none',
                width: { xs: '100%', sm: '60%', md: '150px' },
                alignSelf: { xs: 'center', md: 'flex-start' },
              }}
              onClick={() => console.warn('Workout added to favorites')}
            >
              Add
            </Button>
          </Box>
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

export default Workout;
