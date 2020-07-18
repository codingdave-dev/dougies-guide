import React, {useEffect} from 'react';
import {useRouter} from "next/router";
import {makeStyles, useTheme} from "@material-ui/core/styles";
import {Grid} from "@material-ui/core";
import Head from "next/head";

const useStyles = makeStyles((theme) => ({
    // ADD STYLES HERE
}));

const Logout = () => {
    const router = useRouter()

    useEffect(() => {
        router.push('/')
    })
    return (
        <Grid container direction={'row'}>
            <Head>
                <title key={"title"}>Logout | Dougies Guide</title>
                <meta
                    name={"description"}
                    key={"description"}
                    content={
                        "Logout Page"
                    }
                />
                <meta
                    property={"og:title"}
                    content={"Thanks for visiting | Logout"}
                    key={"og:title"}
                />
                <meta
                    property={"og:url"}
                    content={"dougiesguide.com/logout"}
                    key={"og:url"}
                />
                <link
                    rel="canonical"
                    key={"canonical"}
                    href={"https://dougiesguide.com/logout"}
                />
            </Head>

        </Grid>
    );
};

export default Logout;