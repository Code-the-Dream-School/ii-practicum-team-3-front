import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import FavoriteWorkoutList from '../../components/Profile/FavoriteWorkoutList';

const FavoriteWorkouts = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f9f9f9' }}>
      <FavoriteWorkoutList />
    </Box>
  );
};

export default FavoriteWorkouts;