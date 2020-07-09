import React, { useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import { Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import { getBoardMembers } from "../src/store/actions/boardMemberActions/boardMemberActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import Loader from "../src/ui/Loader";

const useStyles = makeStyles((theme) => ({
  boardWrapper: {
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

  image: {
    borderRadius: "100%",
    width: 200,
    [theme.breakpoints.down("md")]: {
      width: 175,
    },
    [theme.breakpoints.down("sm")]: {
      width: 150,
    },
    [theme.breakpoints.down("xs")]: {
      width: 80,
    },
  },

  boardTextName: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "2em",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.2em",
    },
  },
  boardTextTitle: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.5em",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "1em",
      lineHeight: 1,
    },
  },
  boardTextInfo: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.2em",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.9em",
    },
  },
}));

const mapStateToProps = (state) => {
  let board = [];

  if (
    state.boardMembers.boardMembers &&
    state.boardMembers.boardMembers.length > 0
  ) {
    board = state.boardMembers.boardMembers;
  }

  return {
    board,
    loading: state.loading.loading,
  };
};

const actions = {
  getBoardMembers,
};

const TheBoard = ({ getBoardMembers, board, loading }) => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    getBoardMembers();
  }, [getBoardMembers]);

  return (
    <Grid container direction={"column"} alignItems={"center"}>
      <Grid
        item
        container
        direction={"column"}
        alignItems={"center"}
        className={classes.boardWrapper}
      >
        <Grid item>
          <Typography variant={"h1"} className={classes.title}>
            The Board
          </Typography>
        </Grid>

        {loading && <Loader pageLoader />}

        {!loading &&
          board.map((member) => (
            <Grid
              key={member.id}
              item
              container
              style={{ marginTop: 50, flexWrap: "nowrap" }}
              direction={matchesMD ? "column" : "row"}
              alignItems={matchesMD ? "center" : "flex-start"}
            >
              <Grid item>
                <img
                  className={classes.image}
                  src={member.photoUrl}
                  alt={`${member.fullName} photo`}
                />
              </Grid>
              <Grid
                item
                style={matchesMD ? { marginLeft: 0 } : { marginLeft: 20 }}
              >
                <Grid
                  item
                  container
                  direction={"column"}
                  alignItems={matchesMD ? "center" : "flex-start"}
                >
                  <Grid item>
                    <Typography
                      variant={"h5"}
                      className={classes.boardTextName}
                    >
                      {member.fullName}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      variant={"h6"}
                      className={classes.boardTextTitle}
                    >
                      {member.title}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    style={matchesMD ? { marginTop: 10 } : { marginTop: 0 }}
                  >
                    <Typography
                      variant={"body1"}
                      className={classes.boardTextInfo}
                    >
                      {member.info}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ))}
      </Grid>
    </Grid>
  );
};

export default connect(mapStateToProps, actions)(TheBoard);
