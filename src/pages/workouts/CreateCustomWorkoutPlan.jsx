import Slider from '@mui/material/Slider';
import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import customFetch from '../../api/customFetch';
import { useNavigate } from 'react-router-dom';

//  const for styles

const STEP_INDICATOR_STYLE = {
  width: 900,
  height: 10,
  backgroundColor: '#BBF246',
  borderRadius: 2,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  mb: 8,
  mx: 'auto',
};

const CIRCLE_STYLE = {
  width: 55,
  height: 45,
  borderRadius: '50%',
  backgroundColor: '#EBA919',
  boxShadow: 1,
};

const MAIN_CONTAINER_STYLE = {
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '20px',
  backgroundColor: '#384046',
  p: 2,
};

const TITLE_STYLE = {
  fontSize: 30,
  fontWeight: 'bold',
  color: 'white',
  textAlign: 'center',
  mb: 6,
};

const BUTTON_STYLE = {
  fontSize: 24,
  fontWeight: 'bold',
  width: 300,
  height: 100,
  color: 'black',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '4px',
  boxShadow: 3,
  border: 'none',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#c0c0c0',
  },
};

const CustomWorkoutBuilder = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    gender: '',
    age: '',
    weight: '',
    level: '',
  });
  const navigate = useNavigate();
  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const handleFinish = async () => {
    try {
      const requestData = {
        age: parseInt(formData.age, 10),
        weight: parseFloat(formData.weight),
        level: formData.level,
        gender: formData.gender,
      };

      console.log('Submitting workout data:', requestData);

      // post request

      const response = await customFetch.post('/api/v1/customized-workout/create', requestData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Workout created:', response.data);

      alert('Your custom workout plan has been created successfully!');

      // const handleClick = () => {
      //   if (!id) {
      //     console.warn('WorkoutCard clicked but id is missing');
      //     return;
      //   }
      //   navigate(`/workouts/${id}`);
      // };

      const workoutId = response.data.data._id;
      console.log('workoutId:', workoutId);
      navigate(`/workouts/${workoutId}`);

      // form reset
      setFormData({
        gender: '',
        age: '',
        weight: '',
        level: '',
      });
      setStep(1);
    } catch (error) {
      console.error('Workout creation failed:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });

      let errorMessage = 'Failed to create workout plan. Please try again.';

      if (error.response?.status === 401) {
        errorMessage = 'Session expired. Please login again.';
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      alert(errorMessage);
    }
  };

  return (
    <Box sx={{ textAlign: 'center' }}>
      {/* STEP 1 ---------------------------------------*/}

      {step === 1 && (
        <>
          <Box sx={MAIN_CONTAINER_STYLE}>
            <Typography variant="h4" sx={TITLE_STYLE}>
              Personal program plan:
            </Typography>
            <Box sx={STEP_INDICATOR_STYLE}>
              {[1, 2, 3, 4].map((item) => (
                <Box key={item} sx={CIRCLE_STYLE} />
              ))}
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
              }}
            >
              <form onSubmit={(e) => e.preventDefault()}>
                <Box
                  sx={{
                    display: 'flex',
                    gap: 2,
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
                  <Box
                    component="button"
                    type="button"
                    onClick={() => handleChange('gender')({ target: { value: 'Male' } })}
                    sx={{
                      fontSize: 24,
                      fontWeight: 'bold',
                      width: 300,
                      height: 100,
                      backgroundColor: formData.gender === 'Male' ? '#A9A9A9' : '#D9D9D9',
                      color: 'black',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: '4px',
                      boxShadow: 3,
                      border: 'none',
                      cursor: 'pointer',
                      '&:hover': {
                        backgroundColor: formData.gender === 'Male' ? '#999' : '#c0c0c0',
                      },
                    }}
                  >
                    Male
                  </Box>

                  <Box
                    component="button"
                    type="button"
                    onClick={() => handleChange('gender')({ target: { value: 'Female' } })}
                    sx={{
                      fontSize: 24,
                      fontWeight: 'bold',
                      width: 300,
                      height: 100,
                      backgroundColor: formData.gender === 'Female' ? '#A9A9A9' : '#D9D9D9',
                      color: 'black',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: '4px',
                      boxShadow: 3,
                      border: 'none',
                      cursor: 'pointer',
                      mb: 4,
                      '&:hover': {
                        backgroundColor: formData.gender === 'Female' ? '#999' : '#c0c0c0',
                      },
                    }}
                  >
                    Female
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button variant="contained" disabled={!formData.gender} onClick={handleNext}>
                      Next
                    </Button>
                  </Box>
                </Box>
              </form>
            </Box>
          </Box>
        </>
      )}

      {/* STEP 2 ---------------------------------------*/}

      {step === 2 && (
        <>
          <Box sx={{ ...MAIN_CONTAINER_STYLE, color: 'white' }}>
            <Typography variant="h4" sx={TITLE_STYLE}>
              Personal program plan:
            </Typography>

            <Box sx={STEP_INDICATOR_STYLE}>
              {[1, 2, 3, 4].map((item) => (
                <Box key={item} sx={CIRCLE_STYLE} />
              ))}
            </Box>

            <Box
              sx={{
                backgroundColor: '#D9D9D9',
                width: 800,
                height: 200,
                borderRadius: 1,
                px: 8,
              }}
            >
              <Typography
                sx={{
                  mt: 4,
                  fontSize: 24,
                  fontWeight: 'bold',
                  color: 'black',
                }}
              >
                Age
              </Typography>

              <Slider
                value={Number(formData.age) || 0}
                onChange={(e, newValue) => handleChange('age')({ target: { value: newValue } })}
                valueLabelDisplay="auto"
                min={0}
                max={100}
                sx={{
                  color: '#9EA0A0',
                  width: '100%',
                }}
              />

              <Typography
                sx={{
                  mt: 3,
                  fontSize: 18,
                  color: 'black',
                }}
              >
                Selected Age:{' '}
                <span style={{ color: '#EBA919', fontWeight: 'bold' }}>{formData.age || 0}</span>
              </Typography>
            </Box>

            <Box sx={{ mt: 2 }}>
              <Button
                variant="outlined"
                onClick={handleBack}
                sx={{
                  mr: 2,
                  '&:hover': {
                    color: 'black',
                  },
                }}
              >
                Go Back
              </Button>

              <Button variant="contained" disabled={!formData.age} onClick={handleNext}>
                Next
              </Button>
            </Box>
          </Box>
        </>
      )}

      {/* STEP 3 ---------------------------------------*/}
      {step === 3 && (
        <>
          <Box sx={{ ...MAIN_CONTAINER_STYLE, color: 'white' }}>
            <Typography variant="h4" sx={TITLE_STYLE}>
              Personal program plan:
            </Typography>

            <Box sx={STEP_INDICATOR_STYLE}>
              {[1, 2, 3, 4].map((item) => (
                <Box key={item} sx={CIRCLE_STYLE} />
              ))}
            </Box>

            <Box
              sx={{
                backgroundColor: '#D9D9D9',
                width: 800,
                height: 200,
                borderRadius: 1,
                px: 8,
              }}
            >
              <Typography
                sx={{
                  mt: 4,
                  fontSize: 24,
                  fontWeight: 'bold',
                  color: 'black',
                }}
              >
                Weight
              </Typography>

              <Slider
                value={Number(formData.weight) || 0}
                onChange={(e, newValue) => handleChange('weight')({ target: { value: newValue } })}
                valueLabelDisplay="auto"
                min={0}
                max={350}
                sx={{
                  color: '#9EA0A0',
                  width: '100%',
                }}
              />

              <Typography
                sx={{
                  mt: 3,
                  fontSize: 18,
                  color: 'black',
                }}
              >
                Selected Weight:{' '}
                <span style={{ color: '#EBA919', fontWeight: 'bold' }}>{formData.weight || 0}</span>{' '}
                lbs
              </Typography>
            </Box>

            <Box sx={{ mt: 2 }}>
              <Button
                variant="outlined"
                onClick={handleBack}
                sx={{
                  mr: 2,
                  '&:hover': {
                    color: 'black',
                  },
                }}
              >
                Go Back
              </Button>

              <Button variant="contained" disabled={!formData.weight} onClick={handleNext}>
                Next
              </Button>
            </Box>
          </Box>
        </>
      )}

      {/* STEP 4 ---------------------------------------*/}

      {step === 4 && (
        <Box sx={MAIN_CONTAINER_STYLE}>
          <Typography variant="h4" sx={TITLE_STYLE}>
            Personal program plan:
          </Typography>

          <Box sx={STEP_INDICATOR_STYLE}>
            {[1, 2, 3, 4].map((item) => (
              <Box key={item} sx={CIRCLE_STYLE} />
            ))}
          </Box>

          <form onSubmit={(e) => e.preventDefault()}>
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                flexDirection: 'row',
                justifyContent: 'center',
              }}
            >
              {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
                <Box
                  key={level}
                  component="button"
                  type="button"
                  onClick={() => handleChange('level')({ target: { value: level } })}
                  sx={{
                    fontSize: 24,
                    fontWeight: 'bold',
                    width: 300,
                    height: 100,
                    backgroundColor: formData.level === level ? '#A9A9A9' : '#D9D9D9',
                    color: 'black',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 1,
                    boxShadow: 3,
                    border: 'none',
                    cursor: 'pointer',
                    mb: 4,
                    '&:hover': {
                      backgroundColor: formData.level === level ? '#999' : '#c0c0c0',
                    },
                  }}
                >
                  {level}
                </Box>
              ))}
            </Box>

            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
              <Button
                variant="outlined"
                onClick={handleBack}
                sx={{
                  mr: 2,
                  '&:hover': {
                    color: 'black',
                  },
                }}
              >
                Go Back
              </Button>

              <Button
                variant="contained"
                disabled={!formData.level}
                onClick={() => {
                  console.log('Finish button clicked, formData:', formData); // Логирование для отладки
                  handleFinish();
                }}
                sx={{
                  backgroundColor: formData.level ? '#BBF246' : '#D9D9D9',
                  color: 'black',
                }}
              >
                Finish
              </Button>
            </Box>
          </form>
        </Box>
      )}
    </Box>
  );
};

export default CustomWorkoutBuilder;
