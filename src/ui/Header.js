import React, { Fragment, useEffect, useState } from "react";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/styles";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";
import Link from "../ui/Link";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { openDialog } from "../store/actions/dialogActions/dialogActions";
import { connect } from "react-redux";
import { logout } from "../store/actions/authActions/authActions";

const actions = {
  openDialog,
  logout,
};

const mapStateToProps = (state) => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
  admin: state.firebase.profile.admin,
});

function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: "3em",
    [theme.breakpoints.down("md")]: {
      marginBottom: "2em",
    },
  },
  logo: {
    height: "3.5em",
    [theme.breakpoints.down("md")]: {
      height: "3em",
    },
  },
  logoContainer: {
    marginLeft: "0.5em",
    padding: 0,
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  tabContainer: {
    marginLeft: "auto",
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: "25px",
    "&:hover": {
      color: theme.palette.common.white,
      opacity: 1,
    },
  },
  tabEnd: {
    ...theme.typography.tab,
    marginRight: "25px",
  },

  menu: {
    marginTop: "3em",
    color: "white",
    borderRadius: "0px",
  },
  menuItem: {
    ...theme.typography.tab,
    opacity: 0.7,
    "&:hover": {
      opacity: 1,
    },
  },

  drawerIconContainer: {
    marginLeft: "auto",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  drawerIcon: {
    color: theme.palette.common.white,
    height: "30px",
    width: "30px",
  },
  drawer: {
    backgroundColor: theme.palette.primary.main,
  },
  drawerItem: {
    ...theme.typography.tab,
    color: "white",
    opacity: "0.7",
  },

  drawerItemSelected: {
    "& .MuiListItemText-root": {
      opacity: 1,
    },
  },
  appBar: {
    zIndex: theme.zIndex.modal + 1,
  },
  navButton: {
    color: theme.palette.common.white,
    border: "1px solid" + theme.palette.common.white,
    fontFamily: "Raleway",
    textTransform: "none",
    fontWeight: "500",
    fontSize: "1rem",
  },
}));

// AUTH
let authMenuOptions = [];
let adminAuthRoutes = [];
let authRoutes = [];

// TABS
let tabs = <Fragment></Fragment>;
// DRAWER
let drawer = <Fragment></Fragment>;

const Header = ({
  value,
  setValue,
  selectedIndex,
  setSelectedIndex,
  openDialog,
  logout,
  auth,
  profile,
  admin,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const iOS = process.browser && /iPad|iPhone|ipod/.test(navigator.userAgent);
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const [openDrawer, setOpenDrawer] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  // AUTHENTICATION
  const authenticated =
    auth.isLoaded && !auth.isEmpty && profile.isLoaded && !profile.isEmpty;
  const isAdmin = profile.admin;

  // NO AUTH ROUTES
  const routes = [
    { name: "Home", link: "/", activeIndex: 0 },
    { name: "About Us", link: "/about", activeIndex: 1 },
    { name: "The Board", link: "/the_board", activeIndex: 2 },
    { name: "Listings", link: "/listings", activeIndex: 3 },
  ];
  const buttonRoutes = [
    {
      name: "Login",
      onClick: () => handleSignIn(),
    },
    {
      name: "Register",
      onClick: () => handleRegister(),
    },
  ];

  // AUTH ROUTES
  if (authenticated) {
    authRoutes = [
      {
        name: profile.fullName,
        link: `/profile/userProfile?id=${profile.uid}`,
        activeIndex: isAdmin ? 5 : 4,
        ariaOwns: anchorEl ? "simple-menu" : undefined,
        ariaPopup: anchorEl ? "true" : undefined,
        mouseOver: (event) => handleClick(event),
        end: true,
      },
    ];
    authMenuOptions = [
      {
        name: "Add Listing",
        link: "/listing/newListing",
        activeIndex: isAdmin ? 5 : 4,
        selectedIndex: 0,
      },
      {
        name: "Your Favourites",
        link: `/user/userFavourites?id=${profile.uid}`,
        activeIndex: isAdmin ? 5 : 4,
        selectedIndex: 1,
      },
      {
        name: "Your Listings",
        link: `/user/userListings?id=${profile.uid}`,
        activeIndex: isAdmin ? 5 : 4,
        selectedIndex: 2,
      },
      {
        name: "Checkins",
        link: `/user/userCheckins?id=${profile.uid}`,
        activeIndex: isAdmin ? 5 : 4,
        selectedIndex: 3,
      },
      {
        name: "Profile",
        link: `/profile/userProfile?id=${profile.uid}`,
        activeIndex: isAdmin ? 5 : 4,
        selectedIndex: 4,
      },
      {
        name: "Sign Out",
        link: "/logout",
        activeIndex: isAdmin ? 5 : 4,
        selectedIndex: 5,
      },
    ];
  }
  if (isAdmin) {
    adminAuthRoutes = [
      {
        name: "Admin Area",
        link: "/admin",
        activeIndex: 4,
      },
    ];
  }

  // SIGNIN/SIGNOUT/REGISTER HANDLERS
  const handleRegister = () => {
    openDialog("RegisterDialog");
  };
  const handleSignIn = () => {
    openDialog("LoginDialog");
  };

  const handleSignOut = () => {
    setValue(0);
    setSelectedIndex(0);
    setAnchorEl(null);
    logout();
  };

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
    setOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  const handleMenuItemClick = (e, i) => {
    setAnchorEl(null);
    setOpen(true);
    setSelectedIndex(i);
  };

  useEffect(() => {
    [...authMenuOptions, ...adminAuthRoutes, ...authRoutes, ...routes].forEach(
      (route) => {
        switch (window.location.pathname) {
          case `${route.link}`:
            if (value !== route.activeIndex) {
              setValue(route.activeIndex);
              if (
                route.selectedIndex &&
                route.selectedIndex !== selectedIndex
              ) {
                setSelectedIndex(route.selectedIndex);
              }
            }
            break;
          default:
            break;
        }
      }
    );
  }, [
    value,
    setValue,
    authMenuOptions,
    adminAuthRoutes,
    authRoutes,
    selectedIndex,
    setSelectedIndex,
    routes,
  ]);

  // TABS
  if (!authenticated) {
    tabs = (
      <Fragment>
        <Tabs
          value={value}
          onChange={handleChange}
          className={classes.tabContainer}
        >
          {routes.map((route, index) => (
            <Tab
              key={`${route}${index}`}
              className={classes.tab}
              component={Link}
              href={route.link}
              label={route.name}
            />
          ))}
        </Tabs>

        {/*DROPDOWN MENU*/}
        <Menu
          id={"simple-menu"}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          classes={{ paper: classes.menu }}
          MenuListProps={{ onMouseLeave: handleClose }}
          elevation={0}
          style={{ zIndex: 1302 }}
          keepMounted
        ></Menu>

        {/*BUTTONS*/}
        {buttonRoutes.map((button) => (
          <Button
            key={button.name}
            variant="outlined"
            className={classes.navButton}
            style={{
              marginLeft: button.name === "Login" ? "25px" : "5px",
              marginRight: button.name === "Login" ? null : "25px",
            }}
            onClick={button.onClick}
          >
            {button.name}
          </Button>
        ))}
      </Fragment>
    );
  }
  if (authenticated) {
    tabs = (
      <Fragment>
        <Tabs
          value={value}
          onChange={handleChange}
          className={classes.tabContainer}
        >
          {routes.map((route, index) => (
            <Tab
              key={`${route}${index}`}
              className={classes.tab}
              component={Link}
              href={route.link}
              label={route.name}
            />
          ))}

          {/*ADMIN AUTH ROUTES*/}
          {isAdmin &&
            adminAuthRoutes.map((route, index) => (
              <Tab
                key={`${route}${index}`}
                className={
                  route.end ? classes.tab + " " + classes.tabEnd : classes.tab
                }
                component={Link}
                href={route.link}
                label={route.name}
              />
            ))}

          {/*AUTH ROUTES*/}
          {authRoutes.map((route, index) => (
            <Tab
              key={`${route}${index}`}
              className={
                route.end ? classes.tab + " " + classes.tabEnd : classes.tab
              }
              component={Link}
              href={route.link}
              label={route.name}
              aria-owns={route.ariaOwns}
              aria-haspopup={route.ariaPopup}
              onMouseOver={route.mouseOver}
            />
          ))}
        </Tabs>

        {/*DROPDOWN MENU*/}
        <Menu
          id={"simple-menu"}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          classes={{ paper: classes.menu }}
          MenuListProps={{ onMouseLeave: handleClose }}
          elevation={0}
          style={{ zIndex: 1302 }}
          keepMounted
        >
          {authMenuOptions.map((option, i) => (
            <MenuItem
              key={option.name}
              component={Link}
              href={option.link}
              classes={{ root: classes.menuItem }}
              onClick={(event) => {
                handleMenuItemClick(event, i);
                setValue(option.activeIndex);
                setSelectedIndex(option.selectedIndex);
                handleClose();
                if (option.link === "/logout") {
                  handleSignOut();
                }
              }}
              selected={i === selectedIndex && value === 1}
            >
              {option.name}
            </MenuItem>
          ))}
        </Menu>
      </Fragment>
    );
  }

  if (!authenticated) {
    drawer = (
      <Fragment>
        <SwipeableDrawer
          disableBackdropTransition={!iOS}
          disableDiscovery={iOS}
          open={openDrawer}
          onClose={() => setOpenDrawer(false)}
          onOpen={() => setOpenDrawer(true)}
          classes={{ paper: classes.drawer }}
        >
          <div className={classes.toolbarMargin} />
          <List disablePadding>
            {routes.map((route) => (
              <ListItem
                key={`${route}${route.activeIndex}`}
                onClick={() => {
                  setOpenDrawer(false);
                  setValue(route.activeIndex);
                  setSelectedIndex(null);
                }}
                divider
                button
                component={Link}
                href={route.link}
                selected={value === route.activeIndex}
                classes={{ selected: classes.drawerItemSelected }}
              >
                <ListItemText className={classes.drawerItem} disableTypography>
                  {route.name}
                </ListItemText>
              </ListItem>
            ))}

            {buttonRoutes.map((button) => (
              <ListItem
                key={button.name}
                onClick={button.onClick}
                divider
                button
              >
                <ListItemText className={classes.drawerItem} disableTypography>
                  {button.name}
                </ListItemText>
              </ListItem>
            ))}
          </List>
        </SwipeableDrawer>

        <IconButton
          onClick={() => setOpenDrawer(!openDrawer)}
          disableRipple
          className={classes.drawerIconContainer}
        >
          <MenuIcon className={classes.drawerIcon} />
        </IconButton>
      </Fragment>
    );
  }

  if (authenticated) {
    drawer = (
      <Fragment>
        <SwipeableDrawer
          disableBackdropTransition={!iOS}
          disableDiscovery={iOS}
          open={openDrawer}
          onClose={() => setOpenDrawer(false)}
          onOpen={() => setOpenDrawer(true)}
          classes={{ paper: classes.drawer }}
        >
          <div className={classes.toolbarMargin} />
          <List disablePadding>
            {routes.map((route) => (
              <ListItem
                key={`${route}${route.activeIndex}`}
                onClick={() => {
                  setOpenDrawer(false);
                  setValue(route.activeIndex);
                  setSelectedIndex(null);
                }}
                divider
                button
                component={Link}
                href={route.link}
                selected={value === route.activeIndex}
                classes={{ selected: classes.drawerItemSelected }}
              >
                <ListItemText className={classes.drawerItem} disableTypography>
                  {route.name}
                </ListItemText>
              </ListItem>
            ))}

            {isAdmin && (
              <div>
                {adminAuthRoutes.map((route) => (
                  <ListItem
                    key={`${route}${route.activeIndex}`}
                    onClick={() => {
                      setOpenDrawer(false);
                      setValue(route.activeIndex);
                      setSelectedIndex(null);
                    }}
                    divider
                    button
                    component={Link}
                    href={route.link}
                    selected={value === route.activeIndex}
                    classes={{ selected: classes.drawerItemSelected }}
                  >
                    <ListItemText
                      className={classes.drawerItem}
                      disableTypography
                    >
                      {route.name}
                    </ListItemText>
                  </ListItem>
                ))}
              </div>
            )}

            <div style={{ marginTop: "3em" }}>
              {authRoutes.map((route) => (
                <ListItem
                  key={`${route}${route.activeIndex}`}
                  onClick={() => {
                    setOpenDrawer(false);
                    setValue(route.activeIndex);
                    setSelectedIndex(null);
                  }}
                  divider
                  button
                  component={Link}
                  href={route.link}
                  selected={value === route.activeIndex}
                  classes={{ selected: classes.drawerItemSelected }}
                >
                  <ListItemText
                    className={classes.drawerItem}
                    disableTypography
                  >
                    {route.name}
                  </ListItemText>
                </ListItem>
              ))}
            </div>

            {authMenuOptions.map((route) => (
              <ListItem
                key={route.selectedIndex}
                onClick={() => {
                  setOpenDrawer(false);
                  setSelectedIndex(route.selectedIndex);
                  if (route.link === "/logout") {
                    handleSignOut();
                  }
                }}
                divider
                button
                component={Link}
                href={route.link}
                selected={selectedIndex === route.selectedIndex}
                classes={{ selected: classes.drawerItemSelected }}
              >
                <ListItemText className={classes.drawerItem} disableTypography>
                  {route.name}
                </ListItemText>
              </ListItem>
            ))}
          </List>
        </SwipeableDrawer>

        <IconButton
          onClick={() => setOpenDrawer(!openDrawer)}
          disableRipple
          className={classes.drawerIconContainer}
        >
          <MenuIcon className={classes.drawerIcon} />
        </IconButton>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <ElevationScroll>
        <AppBar position={"fixed"} className={classes.appBar}>
          <Toolbar disableGutters>
            <Button
              component={Link}
              href={"/"}
              disableRipple
              className={classes.logoContainer}
              onClick={() => setValue(0)}
            >
              <img
                src={"/assets/logo/dg_logo.jpg"}
                className={classes.logo}
                alt="company-logo"
              />
            </Button>

            {matches ? drawer : tabs}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </Fragment>
  );
};

export default connect(mapStateToProps, actions)(Header);
