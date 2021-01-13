import React from 'react';
import Customer from "./Customer"
import Card from "../shared/components/UIElements/Card";
import Button from "../shared/components/FormElements/Button";
import List from "@material-ui/core/List";

const CustomerList = props => {
    if (props.items.length === 0) {
        return (
            <div>
                <Card>
                    <h2>No customers found. Maybe add one?</h2>
                    <Button to="/customer">No Customers? Add here!</Button>
                </Card>
            </div>
        );
    }

    return (
        <List>
            {props.items.map(customer => (
                <Customer
                    key={customer.customerId}
                    id={customer.customerId}
                    username={customer.username}
                    email={customer.email}
                    updated={customer.updated}
                    created={customer.created}
                    description={"customer.description for future"}
                    creatorId={"customer.creatorId for future, when there will be multiple admins"}
                    onDelete={props.onDeleteCustomer}
                />
            ))}
        </List>

    );
};
export default CustomerList;
