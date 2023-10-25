import React, { useState } from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { styled } from "@mui/system";
import "../styles/navbar.css";
import ListItemIcon from "@mui/material/ListItemIcon";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import StoreIcon from "@mui/icons-material/Store";
import RevenueIcon from "@mui/icons-material/MonetizationOn";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { useTheme } from "@mui/material/styles";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const theme = useTheme(); // Correct placement of the useTheme hook

  const StyledAppBar = styled(AppBar)(({ theme }) => ({
    backgroundColor: "black",
    color: "white",
  }));

  const StyledToggleButton = styled(ListItem)({
    borderColor: "blue",
    color: theme.palette.text.primary,
    "&:hover": {
      borderColor: "blue",
      backgroundColor: theme.palette.primary.main,
      "& .MuiTypography-root": {
        color: "#fff",
      },
    },
  });

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <div>
      <StyledAppBar position="fixed" style={{ zIndex: 1300 }}>
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            ADMIN DASHBOARD
          </Typography>

          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleDrawer}
            sx={{ mr: "60em" }} // Sử dụng giá trị nhỏ hơn để giảm khoảng cách hoặc xóa dòng này
          >
            <MenuIcon />
          </IconButton>

          <IconButton color="inherit" sx={{ marginLeft: "auto" }}>
            <Badge badgeContent={69} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <Avatar
            src="đường_dẫn_đến_ảnh_avatar"
            sx={{ marginLeft: "40px" }} // Sử dụng giá trị nhỏ hơn để giảm khoảng cách hoặc xóa dòng này
          />

        </Toolbar>
      </StyledAppBar>
      <div className="slide-toggle">
        <Drawer
          className="navbar-drawer"
          anchor="left"
          open={open}
          onClose={toggleDrawer}
          modal={false} // Thay đổi modal từ true thành false
          sx={{
            width: "500px",
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: "400px",
              backgroundColor: "rgb(210, 210, 210)", // Thay đổi màu nền của Drawer
            },
          }}
        >
          <div
            role="presentation"
            onClick={toggleDrawer}
            onKeyDown={toggleDrawer}
          >
            <List style={{ paddingTop: "90px" }}>
              <StyledToggleButton
                button
                component={Link}
                to="/admin"
                className="navbar-btn navbar-item"
              >
                <ListItemIcon>
                  <HomeIcon color="inherit" />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </StyledToggleButton>

              <div>
                <p className="navbar-item">Management</p>
                <hr />
              </div>

              <StyledToggleButton
                button
                component={Link}
                to="/usermanagement"
                className="navbar-btn navbar-item"
              >
                <ListItemIcon>
                  <ManageAccountsIcon color="inherit" />
                </ListItemIcon>
                <ListItemText primary="User Management" />
              </StyledToggleButton>

              <StyledToggleButton
                button
                component={Link}
                to="/productmanagement"
                className="navbar-btn navbar-item"
              >
                <ListItemIcon>
                  <StoreIcon color="inherit" />
                </ListItemIcon>
                <ListItemText primary="Product Management" />
              </StyledToggleButton>

              <div>
                <p className="navbar-item">Income</p>
                <hr />
              </div>

              <StyledToggleButton
                button
                component={Link}
                to="/revenue"
                className="navbar-btn navbar-item"
              >
                <ListItemIcon>
                  <RevenueIcon color="inherit" />
                </ListItemIcon>
                <ListItemText primary="Revenue" />
              </StyledToggleButton>

              <div>
                <p className="navbar-item">Profile</p>
                <hr />
              </div>

              <StyledToggleButton
                button
                component={Link}
                to="/usermanagement"
                className="navbar-btn navbar-item"
              >
                <ListItemIcon>
                  <GroupIcon color="inherit" />
                </ListItemIcon>
                <ListItemText primary="Admin Profile" />
              </StyledToggleButton>

              <StyledToggleButton
                button
                component={Link}
                to="/productmanagement"
                className="navbar-btn navbar-item"
              >
                <ListItemIcon>
                  <MilitaryTechIcon color="inherit" />
                </ListItemIcon>
                <ListItemText primary="Certificate" />
              </StyledToggleButton>
            </List>
          </div>
        </Drawer>
      </div>
    </div>
  );
};

export default Navbar;
