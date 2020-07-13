import React, { useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import {
  fetchAllListings,
  fetchPopularListings,
} from "../src/store/actions/listingActions/listingActions";
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
      fontSize: "1.5em",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.3em",
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


const actions = {
  fetchPopularListings,
  fetchAllListings,
};

const mapStateToProps = (state) => {
  let popularListings = [];
  let allListings = [];

  if (
    state.listings.popularListings &&
    state.listings.popularListings.length > 0
  ) {
    popularListings = state.listings.popularListings;
  }

  if (state.listings.allListings && state.listings.allListings.length > 0) {
    allListings = state.listings.allListings;
  }
  return {
    loading: state.loading.loading,
    popularListings: popularListings,
    allListings: allListings,
  };
};

const Index = ({
  loading,
  fetchPopularListings,
  fetchAllListings,
  popularListings,
  allListings,
}) => {
  const classes = useStyles();
  const theme = useTheme();

  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetchPopularListings();
    fetchAllListings();
  }, [fetchPopularListings, fetchAllListings]);

  const handleSearch = (event) => {
    setSearch(event.target.value);

    const listingData = allListings.map((listing) =>
      Object.values(listing).filter(
        (option) => option !== true && option !== false
      )
    );

    const matches = listingData.map((listing) =>
      listing.map((option) =>
        option
          .toString()
          .toLowerCase()
          .includes(event.target.value.toLowerCase())
      )
    );

    const searchListings = [...allListings];
    matches.map((listing, index) =>
      listing.includes(true)
        ? (searchListings[index].search = true)
        : (searchListings[index].search = false)
    );

    setSearchResults(searchListings);

    if (event.target.value === "") {
      setSearchResults([]);
    }
  };

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

      <Grid
        item
        container
        direction={"column"}
        justify={"center"}
        style={{ marginTop: "2em" }}
      >
        <Grid item>
          <Typography
            variant={"h6"}
            className={classes.searchText}
            align={"center"}
          >
            Search for a dive, restaurant or location
          </Typography>
        </Grid>
        <Grid item container justify={"center"}>
          <TextField
            value={search}
            onChange={handleSearch}
            id={"search-box"}
            label={"Search"}
            variant={"outlined"}
            className={classes.searchBox}
            color={"primary"}
          />
        </Grid>
      </Grid>

      {/*SEARCH RESULTS*/}
      {searchResults.length > 1 && (
        <Grid
          container
          direction={"column"}
          alignItems={"center"}
          style={{ marginTop: "2em" }}
        >
          <Grid
            item
            container
            direction={"column"}
            alignItems={"center"}
            className={classes.listingWrapper}
          >
            <Grid item>
              <Typography
                variant={"h3"}
                className={classes.subTitle}
                align={"center"}
              >
                Search Results
              </Typography>
            </Grid>
            {searchResults &&
              searchResults
                .filter((listing) => listing.search)
                .map((listing) => (
                  <ListingItem key={listing.id} listing={listing} />
                ))}
          </Grid>
        </Grid>
      )}

      {/*OUR FAVOURITES*/}
      {searchResults.length < 1 && (
        <Grid
          container
          direction={"column"}
          alignItems={"center"}
          style={{ marginTop: "2em" }}
        >
          <Grid
            item
            container
            direction={"column"}
            alignItems={"center"}
            className={classes.listingWrapper}
          >
            <Grid item>
              <Typography
                variant={"h3"}
                className={classes.subTitle}
                align={"center"}
              >
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
      )}
    </Grid>
  );
};

export default connect(mapStateToProps, actions)(Index);
