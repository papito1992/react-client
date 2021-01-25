import React, {useContext} from 'react';
import {NavLink} from 'react-router-dom';
import classNames from "classnames";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import {AuthContext} from "../../shared/context/auth-context";
import {ListItemIcon, ListItemText} from "@material-ui/core";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import styles from "../../assets/jss/material-kit-react/components/sidebarStyle.js";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {blackColor, grayColor, whiteColor} from "../../assets/jss/material-kit-react";
import {grey} from "@material-ui/core/colors";

const useStyles = makeStyles(styles);


const CustomerNavLinks = () => {
    const classes = useStyles();
    const auth = useContext(AuthContext);
    // function activeRoute(routeName) {
    //     return window.location.href.indexOf(routeName) > -1 ? true : false;
    // }
    // const whiteFontClasses = classNames({
    //     [" " + classes.whiteFont]: activeRoute("/customer")
    // });
    return (
        <List>
            {auth.isLoggedIn && (
                <NavLink
                    className={" " + classes.item}
                    button to="/customers"
                    exact={true}>
                    <ListItem button dense>
                        <ListItemIcon><InboxIcon style={{ color: grayColor }}/></ListItemIcon>
                        <ListItemText
                            className={classNames(classes.itemText)}
                            primary={"CUSTOMERS"}/>
                    </ListItem>
                </NavLink>
            )}
            {auth.isLoggedIn && (
                <NavLink
                    className={" " + classes.item}
                    to="/customer"
                    exact={true}>
                    <ListItem button dense>
                        <ListItemIcon><InboxIcon style={{ color: grayColor }}/></ListItemIcon>
                        <ListItemText
                            className={classNames(classes.itemText)}
                            disableTypography={true}
                            primary={"ADD CUSTOMER"}/>
                    </ListItem>
                </NavLink>
            )}
        </List>

    );
};

export default CustomerNavLinks;
