import React, {useState} from 'react';
import {makeStyles, useTheme} from "@material-ui/core/styles";
import {Grid} from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {connect} from "react-redux";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AllListings from "./allListings";
import ApprovedListings from "./approvedListings";
import UnapprovedListings from "./unapprovedListings";
import {
    deleteListing, deleteListingPhotos,
    fetchAllListings,
    fetchApprovedListings,
    fetchUnapprovedListings, toggleListingApproved
} from "../../../src/store/actions/adminActions/adminListingActions";
import Head from "next/head";

const useStyles = makeStyles((theme) => ({
    // ADD STYLES HERE
}));

const actions = {
    fetchAllListings,
    fetchApprovedListings,
    fetchUnapprovedListings,
    toggleListingApproved,
    deleteListing
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        admin: state.firebase.profile.admin,
    }
}

const listingRoutes = [
    {
        id: 1,
        name: "All",
    },
    {
        id: 2,
        name: "Approved",
    },
    {
        id: 3,
        name: "Unapproved",
    }
];




const AdminListings = ({profile, fetchAllListings, fetchApprovedListings, fetchUnapprovedListings, toggleListingApproved, deleteListing}) => {
    const classes = useStyles();
    const theme = useTheme();
    const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));

    const [value, setValue] = useState(0);

    const isAdmin = profile.admin

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleListingApprove = (id, approved) => {
        toggleListingApproved(id, approved)
    }

    const handleListingDelete = (id, photoName, photoURL) => {
        deleteListing(id, photoName, photoURL)
    }



    return (
        <Grid container
              direction={"column"}
              alignItems={"center"}
              justify={"center"}
              style={{ marginTop: "1em" }}>
            <Head>
                <title key={"title"}>Listing - Admin | Dougies Guide</title>
                <meta
                    name={"description"}
                    key={"description"}
                    content={
                        "Admin Area for our Listings"
                    }
                />
                <meta
                    property={"og:title"}
                    content={"Listings | Listing"}
                    key={"og:title"}
                />
                <meta
                    property={"og:url"}
                    content={"dougiesguide.com/admin"}
                    key={"og:url"}
                />
                <link
                    rel="canonical"
                    key={"canonical"}
                    href={"https://dougiesguide.com/admin"}
                />
            </Head>

            <Grid item>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                >
                    {listingRoutes.map((listing) => (
                        <Tab key={listing.id} label={listing.name} />
                    ))}
                </Tabs>
            </Grid>

            {value === 0 && <AllListings fetchAllListings={fetchAllListings} toggleListingApprove={handleListingApprove} deleteListing={handleListingDelete} />}
            {value === 1 && <ApprovedListings fetchApprovedListings={fetchApprovedListings} toggleListingApprove={handleListingApprove} deleteListing={handleListingDelete}/>}
            {value === 2 && <UnapprovedListings fetchUnapprovedListings={fetchUnapprovedListings} toggleListingApprove={handleListingApprove} deleteListing={handleListingDelete}/>}

        </Grid>
    );
};

export default connect(mapStateToProps, actions) (AdminListings);