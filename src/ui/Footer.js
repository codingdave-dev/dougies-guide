import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
  // ADD STYLES HERE
}));

const footerDetails = {
  websiteName: "Dougies Guide",
  websiteURL: "http://www.dougiesguide.com",
};

const footerRoutes = [
  {
    id: 1,
    name: "Privacy Policy",
    link: "/privacy",
  },
  {
    id: 2,
    name: "Terms of Use",
    link: "/terms",
  },
  // {
  //   id: 3,
  //   name: "Contact",
  //   link: "/contact",
  // },
];

function Copyright({ websiteName, websiteURL }) {
  return (
    <Typography variant="body2" color="textSecondary" align={"center"}>
      {"Copyright © "}
      <Link color="inherit" href={websiteURL}>
        {websiteName}
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function DesignedBy() {
  return (
      <Typography variant="body2" color="textSecondary" align={"center"}>
        {"Designed and Developed by "}
        <Link color="inherit" href={'https://codingdave.com'}>
          Coding Dave
        </Link>{'.'}
      </Typography>
  );
}

const Footer = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Grid
      container
      direction={"column"}
      style={{ marginTop: "6em", marginBottom: "4em" }}
    >
      <Grid item>
        <Grid item container justify={"center"}>
          {footerRoutes && footerRoutes.map((route) => (
            <Grid
              key={route.id}
              item
              style={{ paddingLeft: "1em", paddingRight: "1em" }}
            >
              <Typography variant={"body2"}>
                <Link
                  color="inherit"
                  href={route.link}
                  style={{ textDecoration: "none" }}
                >
                  {route.name}
                </Link>
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item style={{ marginTop: "0.8em" }}>
        <DesignedBy/>
      </Grid>
      <Grid item style={{ marginTop: "0.8em" }}>
        <Copyright
          websiteName={footerDetails.websiteName}
          websiteURL={footerDetails.websiteURL}
        />
      </Grid>
    </Grid>
  );
};

export default Footer;
