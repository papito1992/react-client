import React from 'react';
import Customer from "./Customer"
import Grid from "@material-ui/core/Grid";
import Card from "../shared/components/UIElements/Card";
import Button from "../shared/components/FormElements/Button";

const CustomerList = props => {
    if (props.items.length === 0) {
        return (
            <div >
                <Card>
                    <h2>No Representatives found. Maybe add one?</h2>
                    <Button to="/customer">No Representatives? Add here!</Button>
                </Card>
            </div>
        );
    }

    return (
        <ul>
            <Grid>
            {props.items.map(customer => (
                <Customer
                    key={customer.customerId}
                    id={customer.customerId}
                    username={customer.username}
                    email={customer.email}
                    description={"Representatives.description for future"}
                    creatorId={"Representatives.creatorId for future, when there will be multiple admins"}
                    onDelete={props.onDeleteRep}
                />
            ))}
            </Grid>
        </ul>
    );
};
export default CustomerList;
