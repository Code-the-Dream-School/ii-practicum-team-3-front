import { Card, CardContent, Typography, Avatar, Stack } from '@mui/material';

const UserInfo = () => {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Stack alignItems="center" spacing={2}>
          <Avatar 
            sx={{
              width: 80,
              height: 80,
              bgcolor: '#C3F73A'
            }}
          >
            A
          </Avatar>
          <Typography variant="h6">Alena</Typography>
        </Stack>
        <Typography sx={{ mt: 2 }}>Gender: Female</Typography>
        <Typography>Age: 33</Typography>
        <Typography>Weight: 65 kg</Typography>
        <Typography>Level: Beginner</Typography>
      </CardContent>
    </Card>
  );
};

export default UserInfo;
