import React, {useContext} from 'react';

import {AuthContext} from '../../context/auth-context';
import Button from "../CustomButtons/Button";

const AuthNavLinks = () => {
    const auth = useContext(AuthContext);
    return (
        <div>
            {auth.isLoggedIn && (
                <Button color="transparent" to="/landing-page" onClick={auth.logout}>
                    LOGOUT
                </Button>
            )}
        </div>
    );
};

export default AuthNavLinks;
