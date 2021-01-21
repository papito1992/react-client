/*eslint-disable*/
import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
// react components for routing our app without refresh
import {Link, useParams} from "react-router-dom";

// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import {Apps, CloudDownload, Home, Person, PersonAdd, PersonAddDisabledSharp} from "@material-ui/icons";

// core components
// import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
// import Button from "components/CustomButtons/Button.js";

import styles from "../../../assets/jss/material-kit-react/components/headerLinksStyle.js";
import Button from "../CustomButtons/Button";
import {useAuth} from "../../hooks/auth-hook";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
    const classes = useStyles();
    const {token, login, logout, userId} = useAuth();
    console.log(token)

    return (
        <React.Fragment>
            <List className={classes.list}>
                {!(window.location.href.indexOf("login-page") > -1) && !token && <ListItem className={classes.listItem}>
                    <Link to={"/login-page"} className={classes.link}>
                        <Button color="primary" size="lg" simple>
                            <Person className={classes.icons}/> Log in
                        </Button>
                    </Link>
                </ListItem>}
                {!(window.location.href.indexOf("login-page") > -1) && !token && <ListItem className={classes.listItem}>
                    <Link to={"/landing-page"} className={classes.link}>
                        <Button color="primary" size="lg" simple>
                            <Home className={classes.icons}/> Home
                        </Button>
                    </Link>
                </ListItem>}
                {!(window.location.href.indexOf("signup-page") > -1)&& !token &&
                <ListItem className={classes.listItem}>
                    <Link to={"/landing-page"} className={classes.link}>
                        <Button color="primary" size="lg" simple>
                            <PersonAdd className={classes.icons}/> Sign up
                        </Button>
                    </Link>
                </ListItem>}
                {token &&
                <ListItem className={classes.listItem}>
                    <Link to={"/customers"} className={classes.link}>
                        <Button color="primary" size="lg" simple>
                            <PersonAdd className={classes.icons}/> Customers
                        </Button>
                    </Link>
                </ListItem>}
                {token &&
                <ListItem className={classes.listItem}>
                    <Link to={"/customer"} className={classes.link}>
                        <Button color="primary" size="lg" simple>
                            <PersonAdd className={classes.icons}/> Add Customer
                        </Button>
                    </Link>
                </ListItem>}
            </List>
        </React.Fragment>
    );
}
