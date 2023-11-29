import React, { useEffect, useState } from "react";
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
import { Popover, Box } from "@mui/material";
import Button from "@mui/material/Button";
import { useAuth } from "../../SanPham/Context/AuthContext";
import customAxios from "../../../CustomAxios/customAxios";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const theme = useTheme(); // Correct placement of the useTheme hook
  const { user, logout } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);
  const [avatarAnchorEl, setAvatarAnchorEl] = useState(null);

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await customAxios.get(
          "/cageshop/api/order/list-all-orderPaid-by/NOT_CONFIRM"
        );

        // Assuming the API response contains an array of notifications
        setNotifications(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleAvatarClick = (event) => {
    setAvatarMenuOpen(!avatarMenuOpen);
    setAvatarAnchorEl(event.currentTarget);
  };

  const handleAvatarClose = () => {
    setAvatarMenuOpen(false);
  };

  const notificationCount = notifications.length;

  const addNotification = (notification) => {
    setNotifications([...notifications, notification]);
  };

  const toggleNotifications = (event) => {
    setAnchorEl(event.currentTarget);
    setShowNotifications(!showNotifications);
  };

  const closeNotifications = () => {
    setAnchorEl(null);
    setShowNotifications(false);
  };

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

  const handleLogout = () => {
    logout();
    setAvatarMenuOpen(false);
  };

  return (
    <div className="navbar-admin-dashboard">
      <StyledAppBar
        position="fixed"
        style={{ zIndex: 1400, backgroundColor: "#24659d" }}
      >
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 10 }}>
            Admin Dashboard
          </Typography>

          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleDrawer}
            sx={{
              marginRight: "1000px",
              marginLeft: "30px",
            }}
          >
            <MenuIcon />
          </IconButton>

          <IconButton
            color="inherit"
            sx={{ marginLeft: "auto" }}
            onClick={toggleNotifications}
          >
            <Badge badgeContent={notificationCount} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <Avatar
            src="https://s120-ava-talk.zadn.vn/a/8/2/b/4/120/1af046c98dfdda606e1b250d0a4bce20.jpg"
            sx={{ marginLeft: "40px" }}
            onClick={(event) => handleAvatarClick(event)}
          />
        </Toolbar>
      </StyledAppBar>

      <Popover
        open={showNotifications}
        anchorEl={window}
        onClose={closeNotifications}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box p={1} style={{ paddingTop: 50 }}>
          <Typography variant="h6" component="div">
            Đang chờ xác nhận
          </Typography>
          <List>
            {notifications.map((notification, index) => (
              <ListItem button key={index}>
                <ListItemText primary={notification} />
                <Box sx={{ "& button": { m: 1 } }}>
                  <div>
                    <Button
                      variant="contained"
                      size="small"
                      style={{ marginLeft: 30 }}
                    >
                      Update
                    </Button>
                  </div>
                </Box>
              </ListItem>
            ))}
          </List>
        </Box>
      </Popover>

      <Popover
        open={avatarMenuOpen}
        anchorEl={window}
        onClose={handleAvatarClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box p={1}>
          <Button
            variant="contained"
            onClick={handleLogout}
            style={{ marginTop: 70 }}
          >
            Logout
          </Button>
        </Box>
      </Popover>

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
              backgroundColor: "#fff", // Thay đổi màu nền của Drawer
            },
          }}
        >
          <div
            role="presentation"
            onClick={toggleDrawer}
            onKeyDown={toggleDrawer}
          >
            <List style={{ padding: "90px 30px 0 30px" }}>
              <StyledToggleButton
                button
                component={Link}
                to="/"
                className="navbar-btn navbar-item"
              >
                <ListItemIcon>
                  <HomeIcon color="inherit" />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </StyledToggleButton>

              <div>
                <p id="navbar-title">Management</p>
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
                to="/staffmanagement"
                className="navbar-btn navbar-item"
              >
                <ListItemIcon>
                  <ManageAccountsIcon color="inherit" />
                </ListItemIcon>
                <ListItemText primary="Staff Management" />
              </StyledToggleButton>
              <StyledToggleButton
                button
                component={Link}
                to="/staffnew"
                className="navbar-btn navbar-item"
              >
                <ListItemIcon>
                  <ManageAccountsIcon color="inherit" />
                </ListItemIcon>
                <ListItemText primary="Marketing Management" />
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

              <StyledToggleButton
                button
                component={Link}
                to="/listnotconfirm"
                className="navbar-btn navbar-item"
              >
                <ListItemIcon>
                  <StoreIcon color="inherit" />
                </ListItemIcon>
                <ListItemText primary="Confirm Management" />
              </StyledToggleButton>

              <StyledToggleButton
                button
                component={Link}
                to="/custom-list"
                className="navbar-btn navbar-item"
              >
                <ListItemIcon>
                <StoreIcon color="inherit" />
                </ListItemIcon>
                <ListItemText primary="Custom List" />
              </StyledToggleButton>

              <StyledToggleButton
                button
                component={Link}
                to="/custom-product"
                className="navbar-btn navbar-item"
              >
                <ListItemIcon>
                <StoreIcon color="inherit" />
                </ListItemIcon>
                <ListItemText primary="Add New Product" />
              </StyledToggleButton>

              <div>
                <p id="navbar-title">Income</p>
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

              <StyledToggleButton
                button
                component={Link}
                to="/voucher"
                className="navbar-btn navbar-item"
              >
                <ListItemIcon>
                  <MilitaryTechIcon color="inherit" />
                </ListItemIcon>
                <ListItemText primary="Voucher" />
              </StyledToggleButton>

              <StyledToggleButton
                button
                component={Link}
                to="/list-voucher"
                className="navbar-btn navbar-item"
              >
                <ListItemIcon>
                  <GroupIcon color="inherit" />
                </ListItemIcon>
                <ListItemText primary="List Voucher" />
              </StyledToggleButton>

              <div>
                <p id="navbar-title">Profile</p>
                <hr />
              </div>

              <StyledToggleButton
                button
                component={Link}
                to="/adminprofile"
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
                to="/list-feedback"
                className="navbar-btn navbar-item"
              >
                <ListItemIcon>
                  <GroupIcon color="inherit" />
                </ListItemIcon>
                <ListItemText primary="FeedBack" />
              </StyledToggleButton>
            </List>
          </div>
        </Drawer>
      </div>
    </div>
  );
};

export default NavBar;
