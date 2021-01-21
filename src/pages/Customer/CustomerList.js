import React, {useContext, useEffect, useState} from 'react';

import CustomerListDetails from "./CustomerListDetails";
import {useHttpClient} from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import {AuthContext} from "../../shared/context/auth-context";

const CustomerList = () => {
    const auth = useContext(AuthContext);
    const [loadedCustomers, setLoadedCustomers] = useState([]);
    const [customerDeleted, setCustomerDeleted] = useState(false);
    const {isLoading, error, sendRequest, clearError} = useHttpClient();

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const responseData = await sendRequest(
                    "http://localhost:8080/customers",'GET',
                    null,
                    {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + auth.token
                    }
                );
                setLoadedCustomers(responseData);
            } catch (err) {
            }
        };
        fetchCustomers();
    }, [sendRequest, setLoadedCustomers, customerDeleted]);

    const customerDeletedHandler = deletedCustomerId => {
        setLoadedCustomers(prevCustomers => {
            prevCustomers.filter(prevCustomer => {
                    return prevCustomer.customerId !== deletedCustomerId
                }
            )
            }
        );
        setCustomerDeleted(!customerDeleted);
    };

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError}/>
            {isLoading && (
                <div className="center">
                    <LoadingSpinner/>
                </div>
            )}
            {!isLoading && loadedCustomers && (
                <CustomerListDetails items={loadedCustomers} onDeleteCustomer={customerDeletedHandler}/>
            )}
        </React.Fragment>
    );
};
export default CustomerList;
