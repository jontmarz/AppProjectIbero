import React, { useState, Fragment } from 'react'
import PropTypes from 'prop-types';
import { AppBar, Box, CssBaseline, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Toolbar, Button, useScrollTrigger, Link } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink } from "react-router-dom";
import { navItems } from '../../config/assets';
import Logo from '../Logo'

const drawerWidth = 240;
NavBar.propTypes = {
  window: PropTypes.func,
}

function ElevationScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  })

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
    style: {
      backgroundColor: trigger ? '#fff' : 'transparent',
      transition: trigger ? '0.3s' : '0.5s',
    }
  })
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
}

export default function NavBar(props) {

  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState)
  }

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Logo />
      <Divider />
      <List>
        {navItems.map((item, i) => (
          <Link to={`#${item.href}`} key={i} style={{ textDecoration: 'none', color: 'white', margin: '0 8px' }}>
            <Button sx={{ color: 'white' }}>
              {item.text}
            </Button>
          </Link>
        ))}
      </List>
    </Box>
  )

  const container = window !== undefined ? () => window().document.body : undefined;


  return (
    <>
    <Fragment>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <ElevationScroll {...props}>
          <AppBar component="nav" color="transparent" position="fixed" sx={{ width: '100%', py: "2" }}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
              <Logo />
              <Box sx={{ display: { xs: 'none', sm: 'flex', justifyContent: "flex-end", width: "100%" } }}>
                {navItems.map((item, i) => (
                  <Button component={RouterLink} to={item.href} key={i} sx={{ color: 'white', mx: 1 }}>
                    {item.text}
                  </Button>
                ))}
              </Box>
            </Toolbar>
          </AppBar>
        </ElevationScroll>
        <nav>
          <Drawer
            container={container}
            variant="temporary"
            anchor="left"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
        </nav>
      </Box>
    </Fragment>
    </>
  )
}
