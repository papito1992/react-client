import React, {useContext, useEffect, useRef, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';


import './CustomerForm.css';
import {AuthContext} from "../../shared/context/auth-context";
import {useHttpClient} from "../../shared/hooks/http-hook";
import {useForm} from "../../shared/hooks/form-hook";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import Card from "../../shared/components/UIElements/Card";
import 'react-widgets/dist/css/react-widgets.css';
import DropdownList from 'react-widgets/lib/DropdownList'
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import Input from "../../shared/components/FormElements/Input";
import {VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from "../../shared/util/validators";
import Button from "../../shared/components/FormElements/Button";

const UpdateCustomer = () => {
        const auth = useContext(AuthContext);
        const {isLoading, error, sendRequest, clearError} = useHttpClient();
        const [loadedCustomer, setLoadedCustomer] = useState();
        const [currentRep, setCurrentRep] = useState({});
        const currentRepReference = useRef(currentRep);
        currentRepReference.current = currentRep;
        const [loadedRepresentatives, setLoadedRepresentatives] = useState([]);
        const customerId = useParams().customerId;
        const history = useHistory();

        const [formState, inputHandler, setFormData] = useForm(
            {
                username: {
                    value: '',
                    isValid: false
                },
                email: {
                    value: '',
                    isValid: false
                },
                representativeIsbn: {
                    value: '',
                    isValid: true
                },
                hasRepresentation: {
                    value: false,
                    isValid: true
                }
            },
            false
        );

        useEffect(() => {

            const fetchCustomer = async () => {
                try {
                    await sendRequest(
                        `http://localhost:8080/customers/${customerId}`, 'GET', null,
                        {
                            'Content-Type': 'application/json',
                            Authorization: 'Bearer ' + auth.token
                        }).then(
                        responseData => {
                            setLoadedCustomer(responseData);
                            fetchRep(responseData);
                        }
                    );

                } catch (err) {
                }
            };
            const fetchReps = async () => {
                try {
                    await sendRequest(
                        `http://localhost:8080/representatives`,
                        'GET',
                        null,
                        {
                            'Content-Type': 'application/json',
                            Authorization: 'Bearer ' + auth.token
                        }
                    ).then(responseData => {
                        setLoadedRepresentatives(responseData)

                    });
                } catch (err) {
                }
            }
            const fetchRep = async (props) => {
                try {
                    await sendRequest(
                        `http://localhost:8080/representatives/${props.representativeIsbn}`,
                        'GET',
                        null,
                        {
                            'Content-Type': 'application/json',
                            Authorization: 'Bearer ' + auth.token
                        }
                    ).then(responseData => {
                        setCurrentRep(responseData)
                    });
                } catch (err) {
                }
            }
            fetchCustomer();
            fetchReps();
        }, [sendRequest, customerId, setCurrentRep]);

        const customerUpdateSubmitHandler = async event => {
            event.preventDefault();
            try {
                await sendRequest(
                    `http://localhost:8080/customers/${customerId}`,
                    'PUT',
                    JSON.stringify({
                        username: formState.inputs.username.value,
                        email: formState.inputs.email.value,
                        representativeIsbn: formState.inputs.representativeIsbn.value,
                        hasRepresentation: formState.inputs.hasRepresentation.value
                    }),
                    {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + auth.token
                    }
                );
                history.push('/customers');
            } catch (err) {
            }
        };
        if (isLoading) {
            return (
                <div className="center">
                    <LoadingSpinner/>
                </div>
            );
        }

        if (!loadedCustomer && !error) {
            return (
                <div className="center">
                    <Card>
                        <h2>Could not find customer!</h2>
                    </Card>
                </div>
            );
        }
        const representativeChangeHandler = (props) => {
            setFormData(
                {
                    username: {
                        value: loadedCustomer.username,
                        isValid: true
                    },
                    email: {
                        value: loadedCustomer.email,
                        isValid: true
                    },
                    representativeIsbn: {
                        value: props.isbn,
                        isValid: true
                    },
                    hasRepresentation: {
                        value: true,
                        isValid: true
                    }
                },
                true
            );
        }

        return (
            <React.Fragment>
                <ErrorModal error={error} onClear={clearError}/>
                {!isLoading && loadedCustomer && (
                    <form className="customer-form" onSubmit={customerUpdateSubmitHandler}>
                        <Input
                            id="username"
                            element="input"
                            type="text"
                            label="USERNAME"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="Please enter a valid USERNAME."
                            onInput={inputHandler}
                            initialValue={loadedCustomer.username}
                            initialValid={true}
                            disabled={true}
                        />
                        <Input
                            id="email"
                            element="input"
                            label="EMAIL"
                            validators={[VALIDATOR_MINLENGTH(5)]}
                            errorText="Please enter a valid EMAIL (min. 5 characters)."
                            onInput={inputHandler}
                            initialValue={loadedCustomer.email}
                            initialValid={true}
                            disabled={true}
                        />
                        <p>Representatives: Unique name: {loadedCustomer.representativeIsbn}</p>
                        <p>Representatives: Username: {currentRep.username}</p>
                        <p>Representatives: Email: {currentRep.email}</p>
                        <h3>Update or Add Representative!</h3>
                        <DropdownList
                            allowCreate={false}
                            onChange={representativeChangeHandler}
                            textField={item => item.isbn}
                            data={loadedRepresentatives}
                            initialValid={true}
                            defaultValue={loadedRepresentatives[0]}
                        />
                        { loadedCustomer.hasRepresentation &&(<Input
                            id="hasRepresentation"
                            element="input"
                            label="Representation Status"
                            onInput={inputHandler}
                            validators={[]}
                            initialValid={true}
                            disabled={true}
                            initialValue={loadedCustomer.hasRepresentation}
                        />)}
                        <hr/>
                        <Button type="submit" disabled={!formState.isValid}>
                            UPDATE CUSTOMER
                        </Button>
                    </form>
                )}
            </React.Fragment>
        );
    }
;

export default UpdateCustomer;
