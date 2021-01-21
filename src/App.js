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

const App = () => {
    const {token, login, logout, userId} = useAuth();

    let routes;

    if (token) {
        routes = (
            <Switch>
                <Route path="/landing-page">
                    <LandingPage/>
                </Route>
                <Route path="/customers" exact>
                    <CustomerList/>
                </Route>
                <Route path="/customer" exact>
                    <AddCustomer/>
                </Route>
                <Route path="/customers/:customerId">
                    <UpdateCustomer/>
                </Route>
                {/*<Redirect from="/auth" to="/customers"/>*/}
            </Switch>
        );
    }
    else {
        routes = (
            <Switch>
                <Route path="/login-page">
                    <Auth/>
                </Route>
                <Route path="/landing-page">
                    <LandingPage/>
                </Route>
                <Redirect from="/" to="/landing-page"/>
            </Switch>
        );
    }

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
                <MainNavigation/>
                <main>{routes}</main>
            </Router>
        </AuthContext.Provider>
    );
};

export default App;
