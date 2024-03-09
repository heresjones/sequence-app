import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { ListItemIcon, ListItemText } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const pages = [
  "counting",
  "digits of pi",
  "fibonacci",
  "prime numbers",
  "exponents",
];

const fractals = ["mandelbrot set", "levy c curve", "sierpinski triangle"];

function ResponsiveAppBar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [subMenuAnchorEl, setSubMenuAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const [fractalMenuAnchorEl, setFractalMenuAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleOpenSubMenu = (event: React.MouseEvent<HTMLElement>) => {
    setSubMenuAnchorEl(event.currentTarget);
  };

  const handleCloseSubMenu = () => {
    setSubMenuAnchorEl(null);
  };

  const handleOpenFractalMenu = (event: React.MouseEvent<HTMLElement>) => {
    setFractalMenuAnchorEl(event.currentTarget);
  };

  const handleCloseFractalMenu = () => {
    setFractalMenuAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Math App
          </Typography>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
          >
            <MenuItem onClick={handleOpenSubMenu}>
              <ListItemIcon>
                <ArrowDropDownIcon />
              </ListItemIcon>
              <ListItemText>Sequences</ListItemText>
            </MenuItem>
            <Menu
              id="sub-menu-appbar"
              anchorEl={subMenuAnchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(subMenuAnchorEl)}
              onClose={handleCloseSubMenu}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page}
                  component={Link}
                  to={`/${page.toLowerCase().replace(/ /g, "")}`}
                  onClick={handleCloseSubMenu}
                >
                  {page}
                </MenuItem>
              ))}
            </Menu>
            <MenuItem onClick={handleOpenFractalMenu}>
              <ListItemIcon>
                <ArrowDropDownIcon />
              </ListItemIcon>
              <ListItemText>Fractals</ListItemText>
            </MenuItem>
            <Menu
              id="fractal-menu-appbar"
              anchorEl={fractalMenuAnchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(fractalMenuAnchorEl)}
              onClose={handleCloseFractalMenu}
            >
              {fractals.map((fractal) => (
                <MenuItem
                  key={fractal}
                  component={Link}
                  to={`/${fractal.toLowerCase().replace(/ /g, "")}`}
                  onClick={handleCloseFractalMenu}
                >
                  {fractal}
                </MenuItem>
              ))}
            </Menu>
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
