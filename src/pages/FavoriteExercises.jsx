import { useState, useEffect, useRef } from 'react';

import { Container, Box, Typography, Pagination, Skeleton, Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

import { getSavedExercises } from '../api/DBRequests';
import ExerciseCard from '../components/ExerciseCard';

function FavoriteExercises() {
  const [page, setPage] = useState(1);
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const backPath = location.state?.from || '/profile';

  const observer = useRef(null);
  const itemsRef = useRef([]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const fetchExercises = async () => {
    try {
      setLoading(true);
      const data = await getSavedExercises(page, 6);
      if (data.data.length === 0) {
        setExercises([]);
        setTotalPages(1);
      } else {
        setExercises(data.data);
        setTotalPages(data.totalPages);
      }
    } catch (error) {
      console.error('Failed to fetch exercises:', error);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExercises();
  }, [page]);

  const handleIntersection = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  };

  useEffect(() => {
    observer.current = new IntersectionObserver(handleIntersection, {
      rootMargin: '0px',
      threshold: 0.1,
    });

    itemsRef.current.forEach((item) => {
      if (item) {
        observer.current.observe(item);
      }
    });

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [exercises]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#f9f9f9',
        pt: 4,
      }}
    >
      <Container sx={{ display: 'flex', flexDirection: 'column', minHeight: '85vh' }}>
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
          Favorite Exercises:
        </Typography>
        {/* Cards */}
        <Box
          sx={{
            flexGrow: 1,
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 4,
            mt: 4,
          }}
        >
          {loading ? (
            [...Array(6)].map((_, index) => (
              <Skeleton key={index} variant="rectangular" height={300} sx={{ borderRadius: 2 }} />
            ))
          ) : exercises.length > 0 ? (
            exercises.map((exercise, index) => (
              <Box
                key={exercise._id}
                ref={(el) => (itemsRef.current[index] = el)}
                className="exercise-card"
                sx={{
                  position: 'relative',
                  opacity: 0,
                  transition: 'opacity 0.5s ease-out',
                  '&.in-view': {
                    opacity: 1,
                  },
                }}
              >
                <ExerciseCard {...exercise} />
              </Box>
            ))
          ) : (
            <Typography variant="h6" align="center" sx={{ gridColumn: '1 / -1' }}>
              No exercises found.
            </Typography>
          )}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            sx={{ mb:4 }}
          />
        </Box>
      </Container>
    </Box>
  );
}

export default FavoriteExercises;