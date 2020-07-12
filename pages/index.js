import React, {useEffect} from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import {connect} from "react-redux";
import {fetchPopularListings} from "../src/store/actions/listingActions/listingActions";
import ListingItem from "../src/ui/listing/listingItem/ListingItem";
import Loader from "../src/ui/Loader";

const useStyles = makeStyles((theme) => ({
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
  subTitle: {
    [theme.breakpoints.down("md")]: {
      fontSize: "2em",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.3em",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.9em",
    },
  },
  slogan: {
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
  searchText: {
    [theme.breakpoints.down("md")]: {
      fontSize: "1.4em",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "1em",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.8em",
    },
  },
  searchBox: {
    width: "40em",
  },
  listingWrapper: {
    width: "80%",
    [theme.breakpoints.down("md")]: {
      width: "90%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "95%",
    },
  },



  card: {
    maxWidth: 345,
  },
  cardMedia: {
    height: 140,
  },
}));

// const favourites = [
//   {
//     id: 1,
//     name: "Santas Pub",
//     description:
//       "This is Santas Pub description, it will be limited to 100 characters",
//     photoURL: "/assets/avatar/building.png",
//   },
//   {
//     id: 2,
//     name: "Santas Pub 2",
//     description:
//       "This is Santas Pub description, it will be limited to 100 characters",
//     photoURL: "/assets/avatar/building.png",
//   },
//   {
//     id: 3,
//     name: "Santas Pub 3",
//     description:
//       "This is Santas Pub description, it will be limited to 100 characters",
//     photoURL: "/assets/avatar/building.png",
//   },
//   {
//     id: 4,
//     name: "Santas Pub 4",
//     description:
//       "This is Santas Pub description, it will be limited to 100 characters",
//     photoURL: "/assets/avatar/building.png",
//   },
//   {
//     id: 5,
//     name: "Santas Pub 5",
//     description:
//       "This is Santas Pub description, it will be limited to 100 characters",
//     photoURL: "/assets/avatar/building.png",
//   },
//   {
//     id: 6,
//     name: "Santas Pub 6",
//     description:
//       "This is Santas Pub description, it will be limited to 100 characters",
//     photoURL: "/assets/avatar/building.png",
//   },
//   {
//     id: 7,
//     name: "Santas Pub 7",
//     description:
//       "This is Santas Pub description, it will be limited to 100 characters",
//     photoURL: "/assets/avatar/building.png",
//   },
// ];

const actions = {
  fetchPopularListings
}

const mapStateToProps = (state) => {
  let popularListings = []

  if (state.listings.popularListings && state.listings.popularListings.length > 0) {
    popularListings = state.listings.popularListings;
  }

  return {
    loading: state.loading.loading,
    popularListings: popularListings
  }
}

const Index = ({loading, fetchPopularListings, popularListings}) => {
  const classes = useStyles();
  const theme = useTheme();
  useEffect(() => {
    fetchPopularListings()
  }, [fetchPopularListings])
  return (
    <Grid container direction={"column"} justify={"center"}>
      <Grid item container justify={"center"}>
        <Grid item>
          <Typography variant={"h1"} className={classes.title}>
            Welcome To Dougies Guide
          </Typography>
        </Grid>
      </Grid>
      <Grid item container justify={"center"}>
        <Grid item>
          <Typography variant={"h3"} className={classes.subTitle}>
            The Home of Dive Bars and Fine Dining
          </Typography>
        </Grid>
      </Grid>
      <Grid item container justify={"center"} style={{ marginTop: "1em" }}>
        <Grid item>
          <Typography
            variant={"body1"}
            className={classes.slogan}
            align={"center"}
          >
            "There's nothing like the essence of stale beer, broken dreams and
            shame in a dark, dank joint on a hot sunny day off."
          </Typography>
        </Grid>
      </Grid>

      {/*<Grid*/}
      {/*  item*/}
      {/*  container*/}
      {/*  direction={"column"}*/}
      {/*  justify={"center"}*/}
      {/*  style={{ marginTop: "2em" }}*/}
      {/*>*/}
      {/*  <Grid item>*/}
      {/*    <Typography*/}
      {/*      variant={"h6"}*/}
      {/*      className={classes.searchText}*/}
      {/*      align={"center"}*/}
      {/*    >*/}
      {/*      Search for a dive, restaurant or location*/}
      {/*    </Typography>*/}
      {/*  </Grid>*/}
      {/*  <Grid item container justify={"center"}>*/}
      {/*    <TextField*/}
      {/*      id={"search-box"}*/}
      {/*      label={"Search"}*/}
      {/*      variant={"outlined"}*/}
      {/*      className={classes.searchBox}*/}
      {/*      color={"primary"}*/}
      {/*    />*/}
      {/*  </Grid>*/}
      {/*</Grid>*/}

      {/*OUR FAVOURITES*/}

      <Grid container direction={"column"} alignItems={"center"} style={{marginTop: '2em'}}>

        <Grid
            item
            container
            direction={"column"}
            alignItems={"center"}
            className={classes.listingWrapper}
        >
          <Grid item>
            <Typography variant={"h3"} className={classes.subTitle} align={'center'}>
              Popular Right Now
            </Typography>
          </Grid>

          {loading && <Loader pageLoader />}

          {!loading &&
          popularListings &&
          popularListings.map((listing) => (
              <ListingItem key={listing.id} listing={listing} />
          ))}

        </Grid>
      </Grid>

    </Grid>
  );
};

export default connect(mapStateToProps, actions) (Index);
