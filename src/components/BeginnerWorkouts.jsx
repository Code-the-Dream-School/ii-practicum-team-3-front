import { useState, useEffect, useRef } from 'react';

import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { useTheme, useMediaQuery, Box, Typography, IconButton, Skeleton } from '@mui/material';

import WorkoutCard from './WorkoutCard';
import { getWorkouts } from '../api/DBRequests';

const BeginnerWorkouts = () => {
  const theme = useTheme();
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down('md')); // < 900px
  const isMedium = useMediaQuery('(min-width:900px) and (max-width:1260px)');
  const cardPixelWidth = 560;
  const cardWidth = isMobileOrTablet ? '100%' : `${cardPixelWidth}px`;
  const cardsPerPage = isMobileOrTablet ? 1 : isMedium ? 1 : 2;

  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const workoutContainerRef = useRef(null);

  useEffect(() => {
    const fetchBeginnerWorkouts = async () => {
      try {
        setLoading(true);
        const data = await getWorkouts(1, 10, 'Beginner');
        setWorkouts(data.data);
      } catch (error) {
        console.error('Error fetching beginner workouts:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchBeginnerWorkouts();
  }, []);

  const scrollByCards = (direction) => {
    if (!workoutContainerRef.current) return;
    const scrollAmount = direction * (parseInt(cardWidth) + 32) * cardsPerPage;
    workoutContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  const handleDragStart = (e) => {
    setIsDragging(true);
    setStartX(e.clientX || e.touches[0].clientX);
    setScrollLeft(workoutContainerRef.current.scrollLeft);
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    if (e.cancelable) e.preventDefault();
    const x = e.clientX || e.touches[0].clientX;
    const walk = x - startX;
    workoutContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <Box sx={{ my: 8 }}>
      <Typography
        variant="h4"
        align="center"
        sx={{
          fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
          padding: 8,
        }}
      >
        Beginner&apos;s Start:
      </Typography>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          flexWrap: 'nowrap',
        }}
      >
        <IconButton onClick={() => scrollByCards(-1)}>
          <ArrowBackIos />
        </IconButton>

        <Box
          ref={workoutContainerRef}
          sx={{
            display: 'flex',
            gap: 4,
            width: '100%',
            maxWidth: 1150,
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            cursor: isDragging ? 'grabbing' : 'grab',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          }}
          onWheel={(e) => {
            if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
              e.preventDefault();
              e.currentTarget.scrollLeft += e.deltaX;
            }
          }}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
        >
          {loading
            ? Array.from({ length: cardsPerPage }).map((_, i) => (
                <Skeleton
                  key={i}
                  variant="rectangular"
                  width={cardWidth}
                  height={250}
                  sx={{ borderRadius: 2, flexShrink: 0 }}
                />
              ))
            : workouts.map((workout, index) => (
                <Box
                  key={workout.id}
                  sx={{
                    width: cardWidth,
                    flexShrink: 0,
                    boxSizing: 'border-box',
                    scrollSnapAlign: 'start',
                  }}
                >
                  <WorkoutCard id={workout.id} name={workout.name} index={index} />
                </Box>
              ))}
        </Box>
        <IconButton onClick={() => scrollByCards(1)}>
          <ArrowForwardIos />
        </IconButton>
      </Box>
    </Box>
  );
};

export default BeginnerWorkouts;
