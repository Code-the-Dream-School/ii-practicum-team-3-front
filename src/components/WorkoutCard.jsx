import { Card, CardActionArea, CardMedia, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import image1 from '../assets/images/workoutImage1.png';
import image2 from '../assets/images/workoutImage2.png';
import image3 from '../assets/images/workoutImage3.png';

const images = [image1, image2, image3];

const WorkoutCard = ({ name, id, index }) => {
  const imageUrl = images[index % images.length];
  const navigate = useNavigate();

  const handleClick = () => {
    if (!id) {
      console.warn('WorkoutCard clicked but id is missing');
      return;
    }
    navigate(`/workouts/${id}`);
  };

  return (
    <Card
      sx={{
        display: 'flex',
        overflow: 'hidden',
        padding: 2,
        borderRadius: 2,
        transition: 'transform 0.2s',
        '&:hover': { transform: 'scale(1.01)' },
      }}
    >
      <CardActionArea
        onClick={handleClick}
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'stretch',
          width: '100%',
        }}
      >
        <CardMedia
          component="img"
          image={imageUrl}
          alt={name}
          sx={{
            width: { xs: '100%', sm: '50%' },
            height: 'auto',
            objectFit: 'cover',
            borderRadius: 2,
          }}
        />
        <CardContent sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6" component="div" noWrap title={name}>
            {name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default WorkoutCard;
