import React, {useContext} from 'react';
import {useHistory} from 'react-router-dom';

import Button from "../shared/components/FormElements/Button";
import {AuthContext} from "../shared/context/auth-context";
import {useForm} from "../shared/hooks/form-hook";
import {useHttpClient} from "../shared/hooks/http-hook";
import ErrorModal from "../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../shared/components/UIElements/LoadingSpinner";
import Input from "../shared/components/FormElements/Input";
import {VALIDATOR_EMAIL, VALIDATOR_MINLENGTH} from "../shared/util/validators";

import Card from "../shared/components/UIElements/Card";

const AddCustomer = () => {
    const auth = useContext(AuthContext);
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [formState, inputHandler] = useForm(
        {
            username: {
                value: '',
                isValid: false
            },
            email: {
                value: '',
                isValid: false
            }
        },
        false
    );

    const history = useHistory();

    const customerSubmitHandler = async event => {
        event.preventDefault();
        try {
            const responseData = await sendRequest('http://localhost:8080/customer',
                'POST',
                JSON.stringify({
                    'username': formState.inputs.username.value,
                    'email': formState.inputs.email.value,
                    'representativeIsbn': "defaultRep",
                    'hasRepresentation': false
                })
                ,
                {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token
                });
            history.push('/customers');
        } catch (err) {
        }
    };

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError}/>
            <Card className="card">
                <div>
                    <form onSubmit={customerSubmitHandler}>
                        {isLoading && <LoadingSpinner asOverlay/>}
                        <Input
                            id="username"
                            element="input"
                            type="text"
                            label="USERNAME"
                            validators={[VALIDATOR_MINLENGTH(6)]}
                            errorText="Please enter a valid username. Min length 6!"
                            onInput={inputHandler}
                        />
                        <Input
                            id="email"
                            element="input"
                            type="email"
                            label="EMAIL"
                            validators={[VALIDATOR_EMAIL]}
                            errorText="Please enter a valid email."
                            onInput={inputHandler}
                        />
                        <Button type="submit" disabled={!formState.isValid}>
                            ADD CUSTOMER
                        </Button>
                    </form>
                </div>
            </Card>
        </React.Fragment>
    );
};

export default AddCustomer;
