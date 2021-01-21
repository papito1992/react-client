import React, {useContext} from 'react';
import {NavLink} from 'react-router-dom';


import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import {AuthContext} from "../../shared/context/auth-context";
import {ListItemIcon} from "@material-ui/core";
import InboxIcon from "@material-ui/icons/MoveToInbox";

const CustomerNavLinks = () => {
    const auth = useContext(AuthContext);

    return (
        <List className="nav-links">
            {auth.isLoggedIn && (
                <ListItem button dense>
                    <ListItemIcon><InboxIcon /></ListItemIcon>
                    <NavLink button to="/customers" exact={true}>CUSTOMERS</NavLink>
                </ListItem>
            )}
            {auth.isLoggedIn && (
                <ListItem button dense>
                    <ListItemIcon><InboxIcon /></ListItemIcon>
                    <NavLink to="/customer" exact={true}>ADD A CUSTOMER</NavLink>
                </ListItem>
            )}
        </List>

    );
};

export default CustomerNavLinks;
