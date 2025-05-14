import { useEffect, useState } from 'react';

import { Card, CardContent, Typography } from '@mui/material';
import { toast } from 'react-toastify';

import CustomWorkoutCardPreview from './CustomWorkoutCardPreview';
import { getCustomWorkouts, deleteCustomWorkout } from '../../api/DBRequests';

const CustomWorkouts = () => {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const fetchCustomWorkouts = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const res = await getCustomWorkouts(token);
        if (res.success && res.data.length > 0) {
          setWorkouts(res.data);
        }
      } catch (error) {
        toast.error('Error loading custom workouts');
        console.error(error);
      }
    };

    fetchCustomWorkouts();
  }, []);

  const handleRemoveWorkout = async (id) => {
    const result = await deleteCustomWorkout(id);

    if (result.success) {
      setWorkouts((prevWorkouts) => prevWorkouts.filter((workout) => workout._id !== id));
    } else {
      toast.error('Failed to delete workout');
    }
  };

  return (
    <Card sx={{ height: '100%', p:1}}>
      <CardContent>
        <Typography variant="h5" gutterBottom sx={{ mb: 4 }}>
          Custom Workout
        </Typography>
        {workouts.length > 0 ? (
          workouts.map((workout) => (
            <CustomWorkoutCardPreview
              key={workout._id}
              workout={workout}
              onRemove={handleRemoveWorkout}
            />
          ))
        ) : (
          <Typography variant="body2">No custom workouts available.</Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default CustomWorkouts;
