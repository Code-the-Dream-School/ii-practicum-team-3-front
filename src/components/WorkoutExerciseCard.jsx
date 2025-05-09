import { Card, CardContent, Typography, Box, List, ListItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const WorkoutExerciseCard = ({ exercise }) => {
  const theme = useTheme();

  const {
    exerciseName,
    gifUrl,
    exerciseTarget,
    bodyPart,
    equipment,
    secondaryMuscles,
    instructions,
    sets,
    reps,
  } = exercise;

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
      <CardContent sx={{ flexGrow: 1 }}>
        {gifUrl && (
          <Box
            component="img"
            src={gifUrl}
            alt={exerciseName}
            sx={{ width: '100%', maxHeight: 200, objectFit: 'contain', mb: 2 }}
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
          {exerciseName}
        </Typography>
        <Typography variant="body2">
          <strong>Body Part:</strong> {bodyPart}
        </Typography>
        <Typography variant="body2">
          <strong>Target:</strong> {exerciseTarget}
        </Typography>
        <Typography variant="body2">
          <strong>Equipment:</strong> {equipment}
        </Typography>
        <Typography variant="body2">
          <strong>Sets:</strong> {sets} &nbsp; <strong>Reps:</strong> {reps}
        </Typography>

        {secondaryMuscles?.length > 0 && (
          <>
            <Typography
              variant="subtitle2"
              sx={{ mt: 2, color: theme.palette.primary.main, fontWeight: 'bold' }}
            >
              Secondary Muscles:
            </Typography>
            {secondaryMuscles.map((muscle, idx) => (
              <Typography key={idx} variant="body2" sx={{ pl: 1 }}>
                - {muscle}
              </Typography>
            ))}
          </>
        )}

        {instructions?.length > 0 && (
          <>
            <Typography
              variant="subtitle2"
              sx={{ mt: 2, color: theme.palette.primary.main, fontWeight: 'bold' }}
            >
              Instructions:
            </Typography>
            <List dense>
              {instructions.map((step, idx) => (
                <ListItem key={idx} sx={{ pl: 2 }}>
                  <Typography variant="body2">
                    {idx + 1}. {step}
                  </Typography>
                </ListItem>
              ))}
            </List>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default WorkoutExerciseCard;
