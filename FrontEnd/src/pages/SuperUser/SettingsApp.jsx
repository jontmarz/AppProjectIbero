import { useState } from 'react'
import { useUserContext } from "../../context/UserContext"
import PropTypes from 'prop-types';
import { Grid, Typography, Box, Tabs, Tab } from "@mui/material"
import { Navigate } from "react-router-dom";
import RolesSettings from '../../components/SuperUser/RolesSettings';
import AppSettings from '../../components/SuperUser/AppSettings';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
}

function a11yProps(index) {
  return {
    id: `settings-tab-${index}`,
    'aria-controls': `settings-tabpanel-${index}`,
  };
}

export default function SettingsApp() {

  const [value, setValue] = useState(0);
  const { user } = useUserContext()
  if (!user) return null
  const role = user.role ? user.role === "SuperUser" : false

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }
  
  if (!user) return null
  
  return role ? (
    <>
    <Grid container spacing={2} className="settings" sx={{ mt: 3, px: 5, maxWidth: {xl: 1400}, width: "100%", margin: "2em auto 0" }}>
        <Grid item xs={12} sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", margin:"auto" }}>
            <Typography variant="h2" component="h2" sx={{ fontSize: 35, fontWeight: "bold", my: 2, mr: "3em" }}>Super Usuario</Typography>
        </Grid>
        <Grid item xs={12} sx={{ margin:"auto" }}>
          <Box sx={{ width: '50%', margin: "auto", display: "flex" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="secondary"
              indicatorColor="secondary"
              aria-label="settings tabs"
              sx={{ borderBottom: 1, borderColor: 'divider' }}
            >
              <Tab label="Roles" {...a11yProps(0)} />
              <Tab label="Configuración" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <RolesSettings />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <AppSettings />
          </CustomTabPanel>
        </Grid>
    </Grid>
    </>
  ) : <Navigate to="/" />
}
