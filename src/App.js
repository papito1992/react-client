import React from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import {AuthContext} from './shared/context/auth-context';
import {useAuth} from './shared/hooks/auth-hook';
import Auth from "./shared/Auth/Auth";
import AddCustomer from "./pages/Customer/AddCustomer";
import CustomerList from "./pages/Customer/CustomerList";
import UpdateCustomer from "./pages/Customer/UpdateCustomer";
import LandingPage from "./pages/LandingPage";
import CssBaseline from "@material-ui/core/CssBaseline";

import routes from "./routes.js";
    console.log(routes)
const switchRoutes = (
    <Switch>
        {routes.map((prop, key) => {
            if (prop.layout === "/admin") {
                return (
                    <Route
                        // path={prop.layout + prop.path}
                        path={prop.path}
                        component={prop.component}
                        key={key}
                    />
                );
            }
            return null;
        })}
        <Redirect from="/" to="/dashboard" />
    </Switch>
);
const App = () => {
    const {token, login, logout, userId} = useAuth();

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn: !!token,
                token: token,
                userId: userId,
                login: login,
                logout: logout
            }}
        >
            <Router>
                <CssBaseline/>
                {switchRoutes}
            </Router>
        </AuthContext.Provider>
    );
};

export default App;
