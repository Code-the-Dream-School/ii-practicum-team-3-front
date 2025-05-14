import { Box } from '@mui/material';

import FavoriteWorkoutList from '../../components/Profile/FavoriteWorkoutList';

const FavoriteWorkouts = () => {
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f9f9f9' }}>
      <FavoriteWorkoutList />
    </Box>
  );
};

export default FavoriteWorkouts;