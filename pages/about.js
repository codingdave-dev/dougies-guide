import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  aboutWrapper: {
    width: "80%",
    [theme.breakpoints.down("md")]: {
      width: "90%",
    },
  },
  title: {
    [theme.breakpoints.down("md")]: {
      fontSize: "4em",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "2.5em",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.5em",
    },
  },
  imageContainer: {
    textAlign: "center",
  },
  image: {
    opacity: 0.7,
    borderRadius: 5,
    width: "100%",
  },
  textWrapper: {
    marginTop: "1.5em",
  },
  text: {
    [theme.breakpoints.down("md")]: {
      fontSize: "1.2em",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "1em",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.9em",
    },
  },
}));

const About = () => {
  const classes = useStyles();

  return (
    <Grid container direction={"column"} alignItems={"center"}>
      <Grid
        item
        container
        direction={"column"}
        alignItems={"center"}
        className={classes.aboutWrapper}
      >
        <Grid item>
          <Typography variant={"h1"} className={classes.title}>
            About
          </Typography>
        </Grid>
        <Grid
          item
          className={classes.imageContainer}
          style={{ marginTop: "1em" }}
        >
          <img
            src="/assets/about/about.jpg"
            alt="About Image"
            className={classes.image}
          />
        </Grid>
        <Grid item container direction={"column"}>
          <Grid item className={classes.textWrapper}>
            <Typography variant={"body1"} className={classes.text}>
              Welcome to Dougie’s Guide to fine dining and dive bars for touring
              professionals.
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography variant={"body1"} className={classes.text}>
              Those of you who have toured with me in the last 30+ years and
              allowed me to be your “day off crew chief” know the affinity that
              I have for fine food and dive bars. I started this page as a forum
              for you and I to share our favorite libation spots across the
              globe.
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography variant={"body1"} className={classes.text}>
              This page is exclusive to touring personnel who have been vetted
              by myself and the members of the Dougie’s Guide guild. To be
              granted access to the site, please click the register link and
              provide a brief bio including your rock credentials and what you
              do in the industry.
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography variant={"body1"} className={classes.text}>
              Dougie’s Guide is not exclusive to dive bars and fancy food. Feel
              free to add any place you want to share. However, if anyone posts
              anything as asinine as “The Applebee’s by the mall is a great
              place to hang out” I will delete that shit faster than Justin
              Bieber can fall off a stage!
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography variant={"body1"} className={classes.text}>
              I’m not saying that you can’t post anything about a franchise, but
              the theme of this page about supporting local businesses that
              support us.
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography variant={"body1"} className={classes.text}>
              Thank you for visiting Dougie’s Guide. You are experiencing the
              beginning of the roadies’ go-to guide for good food, good times
              and local awareness.
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default About;
