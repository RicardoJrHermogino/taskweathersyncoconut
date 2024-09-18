import { AppBar, Toolbar, Button, Box, styled, Typography } from "@mui/material";
import Link from "next/link"; 
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import { useRouter } from "next/router";

const StyledLink = styled(Link)`
  && {
    color: inherit;
    text-decoration: none;
  }
`;

const StickyAppBar = styled(AppBar)`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 63px;
  z-index: 1000;
`;

export default function Navbar() {
  const router = useRouter(); 

  const handleDashboardRoute = () => {
    router.push('/dashboard');
  };
  const handleForecastRoute = () => {
    router.push('/dashboard/forecasts');
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }} />
      <StickyAppBar position="static" sx={{ backgroundColor: '#292929' }}>
        <Toolbar>
          <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }} px={0}>
            <Button color="inherit" onClick={handleDashboardRoute} sx={{ mx: 8 }}> {/* Moderate margin between buttons */}
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography sx={{ mt: 1, color: 'white', textTransform: 'none' }}>
                  <HomeRoundedIcon fontSize="medium" />
                </Typography>
                <Typography sx={{ fontSize: '0.75rem', color: 'white', textTransform: 'none' }}>
                  Home
                </Typography>
              </Box>
            </Button>

            <Button color="inherit" onClick={handleForecastRoute} sx={{ mx: 8  }}> {/* Moderate margin between buttons */}
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography sx={{ mt: 1, color: 'white', textTransform: 'none' }}>
                  <ThermostatIcon fontSize="medium" />
                </Typography>
                <Typography sx={{ fontSize: '0.75rem', color: 'white', textTransform: 'none' }}>
                  Weather
                </Typography>
              </Box>
            </Button>
          </Box>
        </Toolbar>
      </StickyAppBar>
    </>
  );
}
