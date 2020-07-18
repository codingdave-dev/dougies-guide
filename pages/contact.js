import React, {useState} from 'react';
import {makeStyles, useTheme} from "@material-ui/core/styles";
import {Grid} from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Typography from "@material-ui/core/Typography";

import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

import Router from "next/router";

const useStyles = makeStyles((theme) => ({
    contactWrapper: {
        width: "80%",
        [theme.breakpoints.down("md")]: {
            width: "90%",
        },
    },
    formContainer: {
        width: "50%",
        [theme.breakpoints.down("sm")]: {
            width: "80%",
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
}));

const Contact = () => {
    const classes = useStyles();
    const theme = useTheme();
    const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const sendMessage = () => {
        setLoading(true);
        axios
            .get("https://us-central1-dougiesguide-c9512.cloudfunctions.net/sendMail", {
                params: {
                    name: name,
                    email: email,
                    phone: phone,
                    message: message,
                },
            })
            .then((res) => {
                setLoading(false);
                setName("");
                setEmail("");
                setPhone("");
                setMessage("");
                Router.push({ pathname: "/contact_success" });
            })
            .catch((err) => setLoading(false));
    };

    return (
        <Grid container alignItems={"center"} direction={"column"}>
            <Grid item
                  container
                  direction={"column"}
                  alignItems={"center"}
                  // className={classes.aboutWrapper}
            >
                <Grid item>
                    <Typography variant={"h1"} className={classes.title}>
                        Contact
                    </Typography>
                </Grid>

                <Grid item className={classes.formContainer}  style={{ marginTop: "2em" }}>
                    <Grid item container direction={"column"} spacing={2}>
                        <Grid item>
                            <TextField
                                label={"Name"}
                                id={"name"}
                                value={name}
                                required
                                fullWidth
                                autoComplete={"off"}
                                onChange={(event) => setName(event.target.value)}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                label={"Email"}
                                id={"email"}
                                value={email}
                                required
                                fullWidth
                                autoComplete={"off"}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                label={"Phone"}
                                id={"phone"}
                                value={phone}
                                fullWidth
                                autoComplete={"off"}
                                onChange={(event) => setPhone(event.target.value)}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                label={"Message"}
                                id={"message"}
                                value={message}
                                required
                                multiline
                                rows={10}
                                fullWidth
                                autoComplete={"off"}
                                onChange={(event) => setMessage(event.target.value)}
                            />
                        </Grid>
                        <Grid item style={{ marginTop: "2em" }}>
                            <Grid item container justify={"center"}>
                                <Button variant={"outlined"} onClick={() => sendMessage()}>
                                    {loading ? <CircularProgress /> : "Send Message"}
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>


            </Grid>
        </Grid>
    );
};

export default Contact;