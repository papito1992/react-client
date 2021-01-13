import React from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import {AuthContext} from './shared/context/auth-context';
import {useAuth} from './shared/hooks/auth-hook';
import Auth from "./shared/Auth/Auth";
import AddCustomer from "./pages/Customer/AddCustomer";
import CustomerList from "./pages/Customer/CustomerList";
import UpdateCustomer from "./pages/Customer/UpdateCustomer";

const App = () => {
    const {token, login, logout, userId} = useAuth();

    let routes;

    if (token) {
        routes = (
            <Switch>
                <Route path="/customers/:customerId">
                    <UpdateCustomer/>
                </Route>
                <Route path="/customer" exact>
                    <AddCustomer/>
                </Route>
                <Route path="/customers" exact>
                    <CustomerList/>
                </Route>
            </Switch>
        );
    } else {
        routes = (
            <Switch>
                <Route path="/auth">
                    <Auth/>
                </Route>
                <Redirect to="/auth"/>
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
