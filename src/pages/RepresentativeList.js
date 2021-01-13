import React, {useContext, useEffect, useState} from 'react';

import CustomerListDetails from "./CustomerListDetails";
import {useHttpClient} from "../shared/hooks/http-hook";
import ErrorModal from "../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../shared/components/UIElements/LoadingSpinner";
import {AuthContext} from "../shared/context/auth-context";

const RepresentativeList = () => {
    const auth = useContext(AuthContext);
    const [loadedCustomers, setLoadedCustomers] = useState();
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
    }, [sendRequest]);

    const repDeletedHandler = deletedCustomerId => {
        setLoadedCustomers(prevCustomers =>
            prevCustomers.filter(customer => customer.id !== deletedCustomerId)
        );
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
                <CustomerListDetails items={loadedCustomers} onDeleteRep={repDeletedHandler}/>
            )}
        </React.Fragment>
    );
};
export default RepresentativeList;
