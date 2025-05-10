import { useState, useEffect } from 'react';

import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Stack,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  InputAdornment,
} from '@mui/material';

import customFetch from '../../api/customFetch';
import { useAuth } from '../../context/AuthProvider';

const UserInfo = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    gender: '',
    age: '',
    weight: '',
    fitnessLevel: '',
    firstName: '',
  });

  const [editMode, setEditMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => { //get data from local storage
    const savedData = localStorage.getItem('userData');

    if (savedData) {
      const parsed = JSON.parse(savedData);
      setFormData({
        ...parsed,
        firstName: parsed.firstName || user?.firstName || '',
      });
    } else {
      const fetchUserInfo = async () => { // if no data, get from server
        try {
          const res = await customFetch.get('/api/v1/user/profile');
          console.log('User info from server:', res.data);
          setFormData({
            firstName: res.data.firstName || '',
            gender: res.data.gender || '',
            age: res.data.age || '',
            weight: res.data.weight || '',
            fitnessLevel: res.data.fitnessLevel || '',
          });
          // save data to localStorage
          localStorage.setItem('userData', JSON.stringify(res.data));
        } catch (err) {
          console.error('Error loading user data', err);
        }
      };
      fetchUserInfo();
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const { gender, age, weight, fitnessLevel } = formData;

      // check the data before sending
      if (!gender || !age || !weight || !fitnessLevel) {
        throw new Error('Please fill in all fields');
      }

      await customFetch.patch('/api/v1/profile', {
        gender,
        age,
        weight,
        fitnessLevel,
      });
      // save data в localStorage after patch
      localStorage.setItem('userData', JSON.stringify(formData));

      setEditMode(false);
    } catch (err) {
      console.error('Error updating profile', err);
      alert(err.message);
    } finally {
      setIsSaving(false);
    }
  };
  const getAvatarColor = (level) => {
    switch (level) {
      case 'Beginner':
        return '#eca71c'; 
      case 'Intermediate':
        return '#eb6967'; 
      case 'Advanced':
        return '#1d2436'; 
      default:
        return '#A0AEC0';
    }
  };


  return (
    <Card sx={{ height: '100%', padding: '1em'}}>
      <CardContent>
        <Stack alignItems="center" spacing={4}>
          <Avatar sx={{ width: 85, height: 85, bgcolor: getAvatarColor(formData.fitnessLevel)}}>
            {formData.firstName ? formData.firstName[0].toUpperCase() : 'U'}
          </Avatar>
          <Typography variant="h5">{formData.firstName || 'User'}</Typography>
        </Stack>
        {editMode ? (
          <Stack spacing={2} sx={{ mt: 2 }}>
            <FormControl fullWidth>
              <InputLabel id="gender-label">Gender</InputLabel>
              <Select
                labelId="gender-label"
                label="Gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </Select>
            </FormControl>

            <TextField
              name="age"
              label="Age"
              type="number"
              value={formData.age}
              onChange={handleChange}
              fullWidth
              InputProps={{
                startAdornment: <InputAdornment position="start">🎂</InputAdornment>,
              }}
              inputProps={{
                min: 16,
              }}
            />

            <TextField
              name="weight"
              label="Weight (kg)"
              type="number"
              value={formData.weight}
              onChange={handleChange}
              fullWidth
              InputProps={{
                startAdornment: <InputAdornment position="start">🏋️‍♀️</InputAdornment>,
              }}
              inputProps={{
                min: 25,
              }}
            />

            <FormControl fullWidth>
              <InputLabel id="fitness-level-label">Fitness Level</InputLabel>
              <Select
                labelId="fitness-level-label"
                label="Fitness Level"
                name="fitnessLevel"
                value={formData.fitnessLevel}
                onChange={handleChange}
              >
                <MenuItem value="Beginner">Beginner</MenuItem>
                <MenuItem value="Intermediate">Intermediate</MenuItem>
                <MenuItem value="Advanced">Advanced</MenuItem>
              </Select>
            </FormControl>

            <Button variant="contained" onClick={handleSave} disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save'}
            </Button>
          </Stack>
        ) : (
          <>
            <Typography sx={{ mt: 2, fontSize: '1.1rem' }}>
              <strong>Gender: </strong>
              {formData.gender}
            </Typography>
            <Typography sx={{ fontSize: '1.1rem' }}>
              <strong>Age: </strong>
              {formData.age}
            </Typography>
            <Typography sx={{ fontSize: '1.1rem' }}>
              <strong>Weight: </strong>
              {formData.weight} kg
            </Typography>
            <Typography sx={{ fontSize: '1.1rem' }}>
              <strong>Level: </strong>
              {formData.fitnessLevel}
            </Typography>
            <Button
              variant="contained"
              sx={{ mt: 3, fontSize: '0.95rem', padding: '6px 20px' }}
              onClick={() => setEditMode(true)}>
              Edit
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default UserInfo;
