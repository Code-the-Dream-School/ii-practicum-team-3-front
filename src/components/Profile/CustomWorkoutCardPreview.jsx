import { Box, Typography, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CustomWorkoutCardPreview = ({ workout, onRemove }) => {
  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate(`/custom-workout/${workout._id}`);
  };

  const handleRemoveClick = (e) => {
    e.stopPropagation(); 
    onRemove(workout._id);
  };

  return (
    <Paper
      elevation={3}
      onClick={handleCardClick}
      sx={{
        p: 2,
        borderRadius: 2,
        backgroundColor: '#f9f9f9',
        cursor: 'pointer',
        transition: '0.2s',
        '&:hover': { boxShadow: 6 },
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        <Typography variant="h6" fontWeight={600}>
          {workout.name}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Level: {workout.level}
        </Typography>
        <Typography variant="body2">
          {workout.description.length > 100
            ? workout.description.slice(0, 100) + '...'
            : workout.description}
        </Typography>
        <Button variant="outlined" color="warning" size="small" onClick={handleRemoveClick}>
          Remove
        </Button>
      </Box>
    </Paper>
  );
};


export default CustomWorkoutCardPreview;
