import { Box, Typography, Avatar, Link, useTheme, Stack } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

const teamMembers = [
  {
    name: 'Alena Danilchenko',
    role: 'Front-End Developer',
    img: 'https://ca.slack-edge.com/T07EHJ738-U072JPU4JKZ-8ab987c58982-512',
    linkedin: '',
    github: '',
  },
  {
    name: 'Dmitrii Bogorodskii',
    role: 'Back-End Developer',
    img: 'https://ca.slack-edge.com/T07EHJ738-U072SMQFWNS-8b65dd4e3ea1-512',
    linkedin: '',
    github: '',
  },
  {
    name: 'Natalia Sokolova',
    role: 'Back-End Developer',
    img: 'https://ca.slack-edge.com/T07EHJ738-U072JPSREB1-b0eeb614cee7-512',
    linkedin: '',
    github: '',
  },
  {
    name: 'Petr Kekalo',
    role: 'Front-End Developer',
    img: 'https://ca.slack-edge.com/T07EHJ738-U073N4R9XCY-14d529f9c661-512',
    linkedin: 'https://www.linkedin.com/in/petr-kekalo/',
    github: 'https://github.com/pkekalo',
  },
];

const mentors = [
  {
    name: 'Valentina Rudnitskaya',
    role: 'Code Assistant',
    img: 'https://ca.slack-edge.com/T07EHJ738-U06J5V27ZMG-04e747c5bee7-512',
  },
  {
    name: 'Evgenii Rychkov',
    role: 'Front-End Mentor',
    img: 'https://ca.slack-edge.com/T07EHJ738-U076LTPKXRQ-ae8d10d0b7ca-512',
  },
  {
    name: 'Dan P',
    role: 'Back-End Mentor',
    img: 'https://ca.slack-edge.com/T07EHJ738-U0469QPLGE6-9ce9e82152ff-512',
    linkedin: 'https://www.linkedin.com/in/dan-p-eop/',
    github: 'https://github.com/benochi',
  },
];

export default function About() {
  const theme = useTheme();

  return (
    <Box sx={{ textAlign: 'center', py: 6, backgroundColor: theme.palette.background.default }}>
      <Typography variant="h4" gutterBottom>
        About Us
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 4,
          mb: 8,
        }}
      >
        {teamMembers.map((member, idx) => (
          <Box
            key={idx}
            sx={{
              width: 200,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <Avatar src={member.img} alt={member.name} sx={{ width: 120, height: 120, mb: 1 }} />
            <Typography fontWeight="bold">{member.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {member.role}
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
              {member.linkedin && (
                <Link href={member.linkedin} target="_blank" rel="noopener" sx={{ display: 'flex', alignItems: 'center' }}>
                  <LinkedInIcon fontSize="small" sx={{ mr: 0.5 }} /> LinkedIn
                </Link>
              )}
              {member.github && (
                <Link href={member.github} target="_blank" rel="noopener" sx={{ display: 'flex', alignItems: 'center' }}>
                  <GitHubIcon fontSize="small" sx={{ mr: 0.5 }} /> GitHub
                </Link>
              )}
            </Stack>
          </Box>
        ))}
      </Box>

      <Typography variant="h6" gutterBottom>
        About this Project
      </Typography>
      <Typography sx={{ maxWidth: 640, mx: 'auto', mb: 6 }} color="text.secondary">
        FitnessApp is an innovative fitness platform designed to empower users with personalized workout plans, nutritional guidance, and progress tracking. It aims to provide an all-in-one fitness solution, combining exercise customization, data-driven recommendations, and a motivating community experience.
      </Typography>

      <Typography variant="h6">
        Thank you{' '}
        <Link href="https://codethedream.org/" target="_blank" rel="noopener">
          Code the Dream
        </Link>
      </Typography>
      <Typography variant="body1" mb={3}>
        Thank you Mentors
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 4,
        }}
      >
        {mentors.map((mentor, idx) => (
          <Box
            key={idx}
            sx={{
              width: 200,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <Avatar src={mentor.img} alt={mentor.name} sx={{ width: 100, height: 100, mb: 1 }} />
            <Typography fontWeight="bold">{mentor.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {mentor.role}
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
              {mentor.linkedin && (
                <Link href={mentor.linkedin} target="_blank" rel="noopener" sx={{ display: 'flex', alignItems: 'center' }}>
                  <LinkedInIcon fontSize="small" sx={{ mr: 0.5 }} /> LinkedIn
                </Link>
              )}
              {mentor.github && (
                <Link href={mentor.github} target="_blank" rel="noopener" sx={{ display: 'flex', alignItems: 'center' }}>
                  <GitHubIcon fontSize="small" sx={{ mr: 0.5 }} /> GitHub
                </Link>
              )}
            </Stack>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
