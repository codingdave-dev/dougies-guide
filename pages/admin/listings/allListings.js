import React, {useEffect} from 'react';
import {makeStyles, useTheme} from "@material-ui/core/styles";
import {Grid} from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {connect} from "react-redux";
import Loader from "../../../src/ui/Loader";
import ListingItem from "../../../src/ui/admin/ListingItem";

const useStyles = makeStyles((theme) => ({
    listingsWrapper: {
        width: "80%",
        [theme.breakpoints.down("md")]: {
            width: "90%",
        },
        [theme.breakpoints.down("sm")]: {
            width: "95%",
        },
    },
}));

const mapStateToProps = (state) => {
    let allListings = [];

    if (state.admin.allListings && state.admin.allListings.length > 0) {
        allListings = state.admin.allListings;
    }

    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        admin: state.firebase.profile.admin,
        loading: state.loading.loading,
        allListings: allListings,
    };
};

const AllListings = ({loading, fetchAllListings, allListings, toggleListingApprove, deleteListing}) => {
    const classes = useStyles();
    const theme = useTheme();
    const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));

    useEffect(() => {
        fetchAllListings()
    }, [fetchAllListings])


    return (
        <Grid container direction={"column"} alignItems={"center"}>
            <Grid
                item
                container
                direction={"column"}
                alignItems={"center"}
                className={classes.listingsWrapper}
            >
                {loading && <Loader pageLoader />}

                {!loading &&
                allListings &&
                allListings.map((listing) => <ListingItem key={listing.id} listing={listing} toggleListingApprove={toggleListingApprove} deleteListing={deleteListing}/>)}
            </Grid>
        </Grid>
    );
};

export default connect(mapStateToProps) (AllListings);