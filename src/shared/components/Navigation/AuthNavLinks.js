import React, {useContext} from 'react';
import {NavLink} from 'react-router-dom';

import {AuthContext} from '../../context/auth-context';
import Button from "@material-ui/core/Button";

const AuthNavLinks = () => {
    const auth = useContext(AuthContext);
    return (
        <div>
            {!auth.isLoggedIn && (
                <NavLink className="button" to="/auth">
                    LOGIN
                </NavLink>
            )}
            {auth.isLoggedIn && (
                <Button color="secondary" to="/auth" onClick={auth.logout}>
                    LOGOUT
                </Button>
            )}
        </div>
    );
};

export default AuthNavLinks;
