import { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid, CssBaseline, Button, TableContainer, Table, TableHead, TableRow, TableBody, TableCell, IconButton, Badge, FormControl, InputLabel, Select, MenuItem, TextField  } from "@mui/material";
import { Icon } from "@iconify/react";
import dayjs from "dayjs";
import Navbar from "../components/navbar";
import Image from "next/image";
import { useRouter } from 'next/router';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import greeting from 'greeting-time';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import axios from 'axios';






const locationCoordinates = {
  "Sorsogon City": { lat: 12.9742, lon: 124.0058 },
  "Barcelona": { lat: 12.8694, lon: 124.1419 },
  "Bulan": { lat: 12.6697, lon: 123.8758 },
  "Bulusan": { lat: 12.7522, lon: 124.1356 },
  "Casiguran": { lat: 13.2933, lon: 123.8744 },
  "Castilla": { lat: 12.9553, lon:  123.8764},
  "Donsol": { lat: 12.9083, lon:  123.5980},
  "Gubat": { lat: 12.9189, lon:  124.1231},
  "Irosin": { lat: 12.7050, lon:  124.0320},
  "Juban": { lat: 12.8477, lon:  123.9894},
  "Magallanes": { lat: 12.8284, lon:  123.8344},
  "Matnog": { lat: 12.5855, lon:  124.0855},
  "Pilar": { lat: 12.9245, lon:  123.6756},
  "Prieto Diaz": { lat: 13.0458, lon:  124.1929},
  "Santa Magdalena": { lat: 12.6489, lon:  124.1083}
};


const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 285, // Limit the dropdown height
      width: 310,     // Limit the dropdown width
      borderRadius: 12, // Rounded border for the dropdown
      padding: '20px',
    },
  },
};

const Dashboard = () => {
  const [allowWeather, setAllowWeather] = useState(true);
  const [totalTasks, setTotalTasks] = useState(0);
  const [greetingMessage, setGreetingMessage] = useState("");
  const [temperature, setTemperature] = useState(null);
  const [weatherCondition, setWeatherCondition] = useState("");
  const [location, setLocation] = useState("Sorsogon City"); // State to manage the selected location
  const [selectedDate, setSelectedDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [forecast, setForecast] = useState([]);
  const router = useRouter();

  const apiKey = "588741f0d03717db251890c0ec9fd071";

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const { lat, lon } = locationCoordinates[location];

        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
        );

        const filteredData = response.data.list.filter((item) =>
          item.dt_txt.startsWith(selectedDate)
        );

        setForecast(filteredData);

        const currentWeather = filteredData[0];
        setTemperature(Math.round(currentWeather.main.temp));
        setWeatherCondition(currentWeather.weather[0].description);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();

    const currentGreeting = greeting(new Date());
    setGreetingMessage(currentGreeting);
  }, [location, selectedDate]);

  const TaskButton = () => {
    router.push('/dashboard/task');
  };

  const AddTask = () => {
    router.push('/dashboard/addtask');
  };

  const currentDate = dayjs().format("MMMM DD, YYYY");
  const currentDay = dayjs().format("dddd");




  return (
    <>
      <CssBaseline />
      <Navbar />
         <Grid container mb={15} spacing={4} style={{ padding: "20px" }}>


                


                <Grid item xs={6}>
                  <Typography variant="h6"><strong>TaskWeatherSync</strong></Typography>
                </Grid>
                <Grid item xs={6} sx={{ textAlign: 'right' }}>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <IconButton>
                      <Badge badgeContent={0} color="error">
                        <NotificationsIcon />
                      </Badge>
                    </IconButton>
                    <IconButton>
                      <SettingsIcon />
                    </IconButton>
                  </div>
                </Grid>


                
                


                <Grid item xs={12}>
                  <Typography variant="body2" color="#757575">
                    {greetingMessage}, {/* Display the dynamic greeting here */}
                  </Typography>
                  <Typography variant="body"><strong>Ricardo Jr. E. Hermogino</strong></Typography>
                </Grid>

                <Grid item xs={6} md={6} lg={6} >
                  <FormControl fullWidth sx={{  borderRadius: '10px' }}>
                  <InputLabel id="location-label" textAlign="start">Location</InputLabel>
                    <Select
                      labelId="location-label"
                      value={location}
                      MenuProps={MenuProps} 
                      onChange={(e) => setLocation(e.target.value)}
                      label="Location"
                    >
                      {Object.keys(locationCoordinates).map((loc) => (
                        <MenuItem key={loc} value={loc}>{loc}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>



                <Grid item xs={6} md={6} lg={6} align="center">
                  <FormControl fullWidth sx={{ maxWidth: '300px', backgroundColor: '#f0f0f0', minWidth: '90%', borderRadius: '10px' }}>
                    <TextField
                      id="date-picker"
                      label="Date"
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      fullWidth
                      inputProps={{
                        min: dayjs().format("YYYY-MM-DD"), // Prevent past dates from being selected
                      }}
                    />
                  </FormControl>
                </Grid>



                <Grid item xs={12} md={12} lg={12} align="center">
                  <Button 
                    variant="contained" 
                    sx={{ borderRadius: '10px', backgroundColor:'black', minWidth: '100%', py: 2 }}
                    onClick={AddTask} 
                  >
                    <EditCalendarIcon fontSize="medium" />
                    Check task feasibility
                  </Button>
                </Grid>

                
                <Grid item xs={12}>
                    <Card sx={{ borderRadius: 5, boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', minHeight: '100%'}} >
                      <CardContent>
                        <Grid container spacing={6} sx={{ textAlign: "center" }}>
                            <>
                              <Grid item xs={5} sx={{ textAlign: "center" }}>
                                <Image src="/3d-weather-icons/moon/1.png" alt="sample" width={110} height={110} />
                              </Grid>
                              <Grid item xs={7} sx={{ textAlign: "center" }}>
                                <Typography sx={{ letterSpacing: 2 }}>
                                  {weatherCondition ? weatherCondition.charAt(0).toUpperCase() + weatherCondition.slice(1) : "Loading..."} {greetingMessage}
                                </Typography>
                                <Typography variant="h2">
                                  {temperature !== null ? `${temperature}°C` : "Loading..."}
                                </Typography>
                                <Typography>
                                  <strong>{currentDay}</strong>{" "}
                                  <span style={{ color: "#757575" }}>{currentDate}</span>
                                </Typography>
                              </Grid>
                            </>

                        </Grid>

                        <Grid item xs={12} sx={{ textAlign: "center" }} mt={3}>
                          <Typography sx={{ mb: 1 }}><strong>Consider bringing an umbrella with you.</strong></Typography>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>


                
                



                {/* <Grid item xs={12}>
                  <Button onClick={TaskButton}>
                    <Card sx={{ borderRadius: 5, boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', minHeight:'100%' }}>
                      <CardContent>
                        <Grid container>
                          <Grid item xs={12} md={12} textAlign={'center'}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Task Summary</Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <TableContainer>
                              <Table>
                                <TableHead>
                                  <TableRow>
                                    <TableCell>Task</TableCell>
                                    <TableCell>Number</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  <TableRow>
                                    <TableCell>Total Scheduled Tasks</TableCell>
                                    <TableCell><Typography sx={{color:'blue'}}>{totalTasks}</Typography></TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell>Scheduled Tasks Favorable to Weather</TableCell>
                                    <TableCell><Typography sx={{color:'green'}}>10</Typography></TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell>Scheduled Tasks affected by weather</TableCell>
                                    <TableCell><Typography sx={{color:'red'}}>3</Typography></TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell>Restricted Tasks Today</TableCell>
                                    <TableCell>16</TableCell>
                                  </TableRow>
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Button>
                </Grid> */}

                




                {allowWeather && (
                  <Grid item xs={12}>
                    <Typography color="#757575" sx={{fontSize: '0.8rem'}} textAlign={'center'}>
                      The average temperature for the next 5 days will be 21 degrees, it will rain for 7 days
                    </Typography>
                  </Grid>
                )}

                {allowWeather && (
                  <Grid item xs={12}>
                    <Card sx={{ backgroundColor: "#292929", borderRadius: 5 }}>
                      <CardContent>
                        <Grid container spacing={6} sx={{ textAlign: "center" }}>
                          <Grid item xs={4}>
                            <Icon icon="uil:cloud-wind" color="#fff" fontSize={45} />
                            <Typography variant="h6" color="#fff" sx={{ mt: 1 }}>
                              136
                            </Typography>
                            <Typography color="#b3b3b3">Air Quality</Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Icon icon="lets-icons:pressure" color="#fff" fontSize={45} />
                            <Typography variant="h6" color="#fff" sx={{ mt: 1 }}>
                              846hpa
                            </Typography>
                            <Typography color="#b3b3b3">Pressure</Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Icon icon="mdi:uv-ray-outline" color="#fff" fontSize={45} />
                            <Typography variant="h6" color="#fff" sx={{ mt: 1 }}>
                              2
                            </Typography>
                            <Typography color="#b3b3b3">UV</Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Icon icon="mingcute:rain-line" color="#fff" fontSize={45} />
                            <Typography variant="h6" color="#fff" sx={{ mt: 1 }}>
                              4mm
                            </Typography>
                            <Typography color="#b3b3b3">Precipitation</Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Icon icon="bx:wind" color="#fff" fontSize={45} />
                            <Typography variant="h6" color="#fff" sx={{ mt: 1 }}>
                              11km/h
                            </Typography>
                            <Typography color="#b3b3b3">Wind</Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Icon icon="ph:eye-bold" color="#fff" fontSize={45} />
                            <Typography variant="h6" color="#fff" sx={{ mt: 1 }}>
                              6.4 km
                            </Typography>
                            <Typography color="#b3b3b3">Visibility</Typography>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                )}

      </Grid>

      
    </>
  );
};

export default Dashboard;
  