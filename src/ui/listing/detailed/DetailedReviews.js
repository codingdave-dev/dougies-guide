import React, { Fragment } from "react";
import { Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";

import format from 'date-fns/format'

const DetailedReviews = ({ listing, classes }) => {
  return (
    <Fragment>
      <Grid item container direction={"column"}>
        <Grid item>
          <Typography variant={"body1"} className={classes.listingTextTitle}>
            Reviews:
          </Typography>
        </Grid>

        {listing.reviews && listing.reviews.map((review) => (
            <Grid key={review.id} item container style={{ marginTop: 20 }}>
              <Grid item>
                {" "}
                <img
                    className={classes.reviewAvatar}
                    src={review.photoURL}
                    alt=""
                />
              </Grid>

              <Grid item style={{ marginLeft: 6 }}>
                <Grid item container>
                  <Typography variant={"subtitle2"}>{review.addedBy}</Typography>
                </Grid>
                <Grid item style={{ position: "relative", top: "-3px" }}>
                  <Typography variant={"caption"}>{format(review.createdAt.toDate(), 'do LLLL yyyy')}</Typography>
                </Grid>
                <Grid item>
                  <Rating
                      value={review.rating}
                      precision={0.5}
                      readOnly
                      className={classes.reviewRating}
                  />
                </Grid>

                <Grid item style={{ marginTop: 3 }}>
                  <Typography variant={"subtitle2"}>{review.description}</Typography>
                </Grid>
              </Grid>
            </Grid>
        ))}


      </Grid>
    </Fragment>
  );
};

export default DetailedReviews;
