import { Box, Container } from '@mui/material';

import CustomWorkouts from '../components/Profile/CustomWorkouts';
import Favorites from '../components/Profile/Favorites';
import UserInfo from '../components/Profile/UserInfo';


const Profile = () => {
  return (
    <Container
      maxWidth="xl"
      sx={{
        mt: 2,
        borderRadius: 2,
        boxShadow: 3,
        mb: 2,
      }}
      align="center"
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'column', lg: 'row' },
          gap: { xs: 1, md: 2 },
          justifyContent: 'space-between',
          p: { xs: 1, md: 2 },
        }}
      >
        <Box
          sx={{
            flex: 1,
            p: 2,
          }}
        >
          <UserInfo />
        </Box>

        <Box
          sx={{
            flex: 3,
            p: 2,
          }}
        >
          <Favorites />
        </Box>

        <Box
          sx={{
            flex: 1,
            p: 2,
          }}
        >
          <CustomWorkouts />
        </Box>
      </Box>
    </Container>
  );
};

export default Profile;