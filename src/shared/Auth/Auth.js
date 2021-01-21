import React, {useContext} from 'react';

import Card from '../../shared/components/UIElements/Card';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import {VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from '../util/validators';
import {useForm} from '../hooks/form-hook';
import {useHttpClient} from '../hooks/http-hook';
import {AuthContext} from '../context/auth-context';
import './Card.css';
import HeaderLinks from "../components/Header/HeaderLinks";
import Header from "../components/Header/Header";
import image from "../../assets/img/bg7.jpg";
import {makeStyles} from "@material-ui/core/styles";
import styles from "../../assets/jss/material-kit-react/views/loginPage";
import Footer from "../components/Footer/FooterV2";
import GridContainer from "../components/Grid/GridContainer";
import GridItem from "../components/Grid/GridItem";

const useStyles = makeStyles(styles);

const Auth = (props) => {
    const auth = useContext(AuthContext);
    const classes = useStyles();
    const {...rest} = props;
    const dashboardRoutes = [];

    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    console.log("1111111111111111111111111111111")

    const [formState, inputHandler] = useForm(
        {
            name: {
                value: '',
                isValid: false
            },
            password: {
                value: '',
                isValid: false
            }
        },
        false
    );

    const authSubmitHandler = async event => {
        event.preventDefault();
        try {
            const responseData = await sendRequest(
                'http://localhost:8080/api/auth/signin',
                'POST',
                JSON.stringify({
                    'username': formState.inputs.name.value,
                    'password': formState.inputs.password.value
                }),
                {
                    'Content-Type': 'application/json'
                }
            );
            auth.login(responseData.username, responseData.token);
        } catch (err) {
        }
    };

    return (
            <div>
                <ErrorModal error={error} onClear={clearError}/>
                <Header
                    color="transparent"
                    routes={dashboardRoutes}
                    brand="Material Kit React"
                    rightLinks={<HeaderLinks/>}
                    fixed
                    changeColorOnScroll={{
                        height: 400,
                        color: "white"
                    }}
                    {...rest}
                />
                <div
                    className={classes.pageHeader}
                    style={{
                        backgroundImage: "url(" + image + ")",
                        backgroundSize: "cover",
                        backgroundPosition: "top center"
                    }}>
                    <div className={classes.container}>
                        <GridContainer justify="center">
                            <GridItem xs={12} sm={12} md={4}>
                                <Card>
                                    {isLoading && <LoadingSpinner asOverlay/>}
                                    <h2>LOGIN</h2>
                                    <hr/>
                                    <form className={classes.form} onSubmit={authSubmitHandler}>
                                        <Input
                                            element="input"
                                            id="name"
                                            type="text"
                                            label="Your Name(megaUser)"
                                            validators={[VALIDATOR_REQUIRE()]}
                                            errorText="Please enter a name."
                                            onInput={inputHandler}
                                        />
                                        <Input
                                            element="input"
                                            id="password"
                                            type="password"
                                            label="Password(megaUser)"
                                            validators={[VALIDATOR_MINLENGTH(6)]}
                                            errorText="Please enter a valid password, at least 6 characters."
                                            onInput={inputHandler}
                                        />
                                        <Button type="submit" disabled={!formState.isValid}>
                                            LOGIN
                                        </Button>
                                    </form>
                                </Card>
                            </GridItem>
                        </GridContainer>
                    </div>
                </div>
                <Footer whiteFont/>
            </div>
    );
};

export default Auth;
