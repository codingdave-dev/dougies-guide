import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Router from "next/router";
import { Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import ListingDetailForm from "../../src/ui/forms/listing/ListingDetailForm";
import ListingInfoForm from "../../src/ui/forms/listing/ListingInfoForm";
import ListingDescription from "../../src/ui/forms/listing/ListingDescriptionForm";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import {createNewListing} from "../../src/store/actions/listingActions/listingActions";
import Head from "next/head";

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
}));

const actions = {
  createNewListing
}

const NewListing = ({createNewListing, handleSubmit}) => {
  const classes = useStyles();
  const theme = useTheme();

  const [listingDetails, setListingDetails] = useState(true);
  const [listingInfo, setListingInfo] = useState(false);
  const [listingDescription, setListingDescription] = useState(false);

  const onFormSubmit = async (values) => {
    try {
      let createdListing = await createNewListing(values)
      Router.push({pathname: '/listing/detailed', query: {id: createdListing.id}})
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    Router.push({ pathname: "/listings" });
  };
  return (
    <Grid container direction={"column"} alignItems={"center"}>
      <Head>
        <title key={"title"}>New Listing | Dougies Guide</title>
        <meta
            name={"description"}
            key={"description"}
            content={
              "Add a New Listing"
            }
        />
        <meta
            property={"og:title"}
            content={"Add New Listing | Listing"}
            key={"og:title"}
        />
        <meta
            property={"og:url"}
            content={"dougiesguide.com/listing/newListing"}
            key={"og:url"}
        />
        <link
            rel="canonical"
            key={"canonical"}
            href={"https://dougiesguide.com/listing/newListing"}
        />
      </Head>
      {/*HEADER*/}
      <Grid item>
        <Typography variant={"h1"} className={classes.title}>
          New Listing
        </Typography>
      </Grid>
      <Grid item container direction={"column"} alignItems={"center"}>
        {listingDetails && (
          <ListingDetailForm
            cancel={handleCancel}
            onSubmit={() => {
              setListingDetails(false);
              setListingInfo(true);
            }}
          />
        )}
        {listingInfo && (
          <ListingInfoForm
            cancel={handleCancel}
            onBack={() => {
              setListingInfo(false);
              setListingDetails(true);
            }}
            onSubmit={() => {
              setListingInfo(false);
              setListingDescription(true);
            }}
          />
        )}
        {listingDescription && (
          <ListingDescription
            cancel={handleCancel}
            onBack={() => {
              setListingInfo(true);
              setListingDescription(false);
            }}
            onSubmit={handleSubmit(onFormSubmit)}
          />
        )}
      </Grid>
    </Grid>
  );
};

export default connect(
  null,
  actions
)(
  reduxForm({
    form: "newListing",
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
  })(NewListing)
);
