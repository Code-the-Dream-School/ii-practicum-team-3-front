import { Card, CardContent, Typography, Button } from '@mui/material';

const CustomWorkouts = () => {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Custom Workouts
        </Typography>
        <Typography>You’ve created 3 custom workouts</Typography>
        <Button variant="contained" fullWidth sx={{ mt: 2 }}>
          View Custom Workouts
        </Button>
      </CardContent>
    </Card>
  );
};

export default CustomWorkouts;
