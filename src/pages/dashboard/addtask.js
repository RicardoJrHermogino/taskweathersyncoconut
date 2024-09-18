import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, TextField, FormControl, Select, MenuItem, Button, IconButton, Grid, CssBaseline, Checkbox, ListItemText } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useRouter } from 'next/router';
import Navbar from '../components/navbar';

const style = {
  width: '85%',
  maxWidth: 400,
  borderRadius: 6,
  padding: '24px',
  backgroundColor: '#fff',
  margin: 'auto',
  marginTop: '40px',
  boxShadow: 'none',
};

const weatherOptions = [
  'Rain',
  'Strong Winds',
  'Extreme Heat',
  'Storms'
];

const municipalities = [
  'Sorsogon City',
  'Barcelona',
  'Bulan',
  'Bulusan',
  'Casiguran',
  'Castilla',
  'Donsol',
  'Gubat',
  'Irosin',
  'Juban',
  'Magallanes',
  'Matnog',
  'Pilar',
  'Prieto Diaz',
  'Santa Magdalena',
];

// MenuProps for controlling the dropdown size and adding rounded borders
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 250, // Limit the dropdown height
      width: 250,     // Limit the dropdown width
      borderRadius: 12, // Rounded border for the dropdown
      padding: '10px',
    },
  },
};

export default function AddTask() {
  const [taskName, setTaskName] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [selectedWeather, setSelectedWeather] = useState([]);
  const [userId, setUserId] = useState(null);

  const router = useRouter();

  // Fetch userId from localStorage
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userId) {
      try {
        const response = await fetch('http://localhost:3001/tasks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            taskName,
            location,
            date,
            restrictedWeather: selectedWeather,
            userId,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to add task');
        }

        router.push('/dashboard/task/task_components/all_scheduled');
      } catch (error) {
        console.error('Error adding the task:', error);
      }
    } else {
      console.error('User not logged in');
    }
  };

  const handleGoBack = () => {
    router.back();
  };

  const handleWeatherChange = (event) => {
    const { target: { value } } = event;
    setSelectedWeather(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <>
      <Navbar />
      <CssBaseline />
      <Container maxWidth="sm" spacing={6}>
        <Grid container mb={10} >
          <Box sx={style}>
            <IconButton onClick={handleGoBack} sx={{ position: 'absolute', top: 15, left: 20 }}>
              <ArrowBack />
            </IconButton>
            <Typography mb={3} variant="h5"><strong>Add New Task</strong></Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                margin="dense"
                id="task"
                label="Task Name"
                type="text"
                fullWidth
                variant="outlined"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                required
                sx={{ borderRadius: 2 }} // Rounded border for the text field
              />
              <FormControl fullWidth margin="dense">
                <Select
                  labelId="location-label"
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  displayEmpty
                  variant="outlined"
                  MenuProps={MenuProps} // Apply the custom MenuProps for rounded dropdown
                  sx={{ borderRadius: 2 }} // Rounded border for the Select component
                >
                  <MenuItem value="">
                    <em>Select Location</em>
                  </MenuItem>
                  {municipalities.map((municipality) => (
                    <MenuItem key={municipality} value={municipality}>
                      {municipality}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth margin="dense">
                <Select
                  labelId="restricted-weather-label"
                  id="restricted-weather"
                  multiple
                  value={selectedWeather}
                  onChange={handleWeatherChange}
                  renderValue={(selected) => selected.join(', ')}
                  variant="outlined"
                  MenuProps={MenuProps} // Apply the custom MenuProps for rounded dropdown
                  sx={{ borderRadius: 2 }} // Rounded border for the Select component
                >
                  {weatherOptions.map((weather) => (
                    <MenuItem key={weather} value={weather}>
                      <Checkbox checked={selectedWeather.indexOf(weather) > -1} />
                      <ListItemText primary={weather} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                margin="dense"
                id="date"
                label="Date"
                type="date"
                fullWidth
                variant="outlined"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                required
                sx={{ borderRadius: 2 }} // Rounded border for the date field
              />
              <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
                Add Task
              </Button>
            </form>
          </Box>
        </Grid>
      </Container>
    </>
  );
}
