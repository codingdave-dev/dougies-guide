import React, {Fragment} from 'react';
import {Grid} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";



const DetailedEntertainment = ({listing, classes}) => {
    const leftMargin = 8;

    const entertainment = [
        {
            key: "Jukebox",
            text: "Jukebox",
            value: listing.entertainment_jukebox,
        },
        {
            key: "DJ",
            text: "DJ",
            value: listing.entertainment_dj,
        },
        {
            key: "Live Music",
            text: "Live Music",
            value: listing.entertainment_liveMusic,
        },
        {
            key: "Other",
            text: "Other",
            value: listing.entertainment_other,
        },
        {
            key: "Silence",
            text: "Silence",
            value: listing.entertainment_silence,
        },
    ];
    return (
        <Fragment>
            <Grid item container direction={"column"}>
                <Grid item style={{ marginBottom: 5 }}>
                    <Typography variant={"body1"} className={classes.listingTextTitle}>
                        Entertainment:
                    </Typography>
                </Grid>

                {entertainment &&
                entertainment.map((ent) => (
                    <Grid key={ent.key} item >
                        <Grid item container>
                            <Grid item>
                                {ent.value ? (
                                    <CheckIcon fontSize={"small"} />
                                ) : (
                                    <ClearIcon fontSize={"small"} />
                                )}
                            </Grid>
                            <Grid item style={{ marginLeft: leftMargin }}>
                                <Typography variant={"body1"} className={classes.listingText}>
                                    {ent.text}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                ))}
            </Grid>
        </Fragment>
    );
};

export default DetailedEntertainment;