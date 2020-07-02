import React, { Fragment } from "react";
import { Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";

const DetailedActivities = ({ listing, classes }) => {
  const leftMargin = 8;

  const activities = [
    {
      key: "Darts",
      text: "Darts",
      value: listing.activity_darts,
    },
    {
      key: "Shuffleboard",
      text: "Shuffleboard",
      value: listing.activity_shuffleboard,
    },
    {
      key: "Air Hockey",
      text: "Air Hockey",
      value: listing.activity_airHockey,
    },
    {
      key: "Arcade Games",
      text: "Arcade Games",
      value: listing.activity_arcadeGames,
    },
    {
      key: "Pool/Snooker",
      text: "Pool / Snooker",
      value: listing.activity_poolSnooker,
    },
    {
      key: "Corn Hole",
      text: "Corn Hole",
      value: listing.activity_coenHole,
    },
    {
      key: "Bowling",
      text: "Bowling",
      value: listing.activity_bowling,
    },
  ];

  return (
    <Fragment>
      <Grid item container direction={"column"}>
        <Grid item style={{ marginBottom: 5 }}>
          <Typography variant={"body1"} className={classes.listingTextTitle}>
            Activities:
          </Typography>
        </Grid>

        {activities &&
          activities.map((activity) => (
            <Grid key={activity.key} item >
              <Grid item container>
                <Grid item>
                  {activity.value ? (
                    <CheckIcon fontSize={"small"} />
                  ) : (
                    <ClearIcon fontSize={"small"} />
                  )}
                </Grid>
                <Grid item style={{ marginLeft: leftMargin }}>
                  <Typography variant={"body1"} className={classes.listingText}>
                    {activity.text}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          ))}
      </Grid>
    </Fragment>
  );
};

export default DetailedActivities;
