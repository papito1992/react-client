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


const Auth = () => {
    const auth = useContext(AuthContext);
    const {isLoading, error, sendRequest, clearError} = useHttpClient();

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
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError}/>
            <Card className="card">
                {isLoading && <LoadingSpinner asOverlay/>}
                <h2>LOGIN</h2>
                <hr/>
                <form onSubmit={authSubmitHandler}>
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
        </React.Fragment>
    );
};

export default Auth;
