import { useState, useEffect, useRef } from 'react';

import { Container, Box, Typography, Pagination, Skeleton } from '@mui/material';

import { getExercises } from '../api/DBRequests';
import ExerciseCard from '../components/ExerciseCard';
import ExercisesFilters from '../components/ExercisesFilters';

function Exercises() {
  const [bodyPart, setBodyPart] = useState('');
  const [equipment, setEquipment] = useState('');
  const [target, setTarget] = useState('');
  const [page, setPage] = useState(1);

  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const fetchExercises = async () => {
    try {
      setLoading(true);
      const data = await getExercises({ bodyPart, equipment, target, page, limit: 6 });
      setExercises(data.data);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Failed to fetch exercises:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExercises();
  }, [bodyPart, equipment, target, page]);

  const observer = useRef(null);

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

    const items = document.querySelectorAll('.exercise-card');
    items.forEach((item) => observer.current.observe(item));

    return () => {
      observer.current.disconnect();
    };
  }, [exercises]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        pt: 4,
      }}
    >
      <Container>
        <ExercisesFilters
          bodyPart={bodyPart}
          setBodyPart={setBodyPart}
          equipment={equipment}
          setEquipment={setEquipment}
          target={target}
          setTarget={setTarget}
        />
        {/* Cards */}
        <Box
          sx={{
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
            exercises.map((exercise) => (
              <Box
                key={exercise.id}
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
          <Pagination count={totalPages} page={page} onChange={handlePageChange} color="primary" />
        </Box>
      </Container>
    </Box>
  );
}

export default Exercises;
