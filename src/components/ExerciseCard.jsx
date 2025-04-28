import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  List,
  ListItem,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

function ExerciseCard({
  name,
  bodyPart,
  equipment,
  target,
  gifUrl,
  secondaryMuscles,
  instructions,
}) {
  const theme = useTheme();
  return (
    <Card
      sx={{
        p: 2,
        boxShadow: 3,
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {gifUrl && (
          <Box
            component="img"
            src={gifUrl}
            alt={name}
            sx={{ alignSelf: 'center', width: '65%', mb: 2 }}
          />
        )}
        <Typography
          variant="h6"
          sx={{
            mb: 1,
            color: theme.palette.primary.main,
            fontWeight: 'bold',
            textTransform: 'capitalize',
          }}
        >
          {name}
        </Typography>
        <Typography variant="body2" sx={{ color: theme.palette.text.primary, fontWeight: 'bold' }}>
          Body Part: <span style={{ fontWeight: 'normal' }}>{bodyPart}</span>
        </Typography>
        <Typography variant="body2" sx={{ color: theme.palette.text.primary, fontWeight: 'bold' }}>
          Equipment: <span style={{ fontWeight: 'normal' }}>{equipment}</span>
        </Typography>
        <Typography
          variant="body2"
          sx={{ mb: 2, color: theme.palette.text.primary, fontWeight: 'bold' }}
        >
          Target: <span style={{ fontWeight: 'normal' }}>{target}</span>
        </Typography>
        {/* Secondary Muscles */}
        {secondaryMuscles?.length > 0 && (
          <>
            <Typography
              variant="body2"
              sx={{ color: theme.palette.primary.main, fontWeight: 'bold' }}
            >
              Secondary Muscles:
            </Typography>
            {secondaryMuscles.map((muscle, index) => (
              <Typography
                key={index}
                variant="body2"
                sx={{ pl: 1, color: theme.palette.text.secondary }}
              >
                {muscle}
              </Typography>
            ))}
          </>
        )}
        {/* Instructions */}
        {instructions?.length > 0 && (
          <>
            <Typography
              variant="subtitle2"
              sx={{ mt: 2, color: theme.palette.primary.main, fontWeight: 'bold' }}
            >
              Instructions:
            </Typography>
            <List dense>
              {instructions.map((step, index) => (
                <ListItem key={index} sx={{ pl: 2 }}>
                  <Typography variant="body2">
                    {index + 1}. {step}
                  </Typography>
                </ListItem>
              ))}
            </List>
          </>
        )}
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          size="small"
          sx={{
            textTransform: 'none',
            backgroundColor: theme.palette.secondary.main,
          }}
          onClick={() => console.log('Exercise added to favorites')}
        >
          Add
        </Button>
      </CardActions>
    </Card>
  );
}

export default ExerciseCard;
