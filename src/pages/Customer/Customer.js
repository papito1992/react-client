import React, {useContext, useState} from 'react';


import './CustomerItem.css'
import {useHttpClient} from "../../shared/hooks/http-hook";
import {AuthContext} from "../../shared/context/auth-context";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import Modal from "../../shared/components/UIElements/Modal";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const Customer = props => {
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const auth = useContext(AuthContext);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const showDeleteWarningHandler = () => {
        setShowConfirmModal(true);
    };

    const cancelDeleteHandler = () => {
        setShowConfirmModal(false);
    };
    const confirmDeleteHandler = async () => {
        setShowConfirmModal(false);
        try {
            await sendRequest(
                `http://localhost:8080/customers/${props.id}`,
                'DELETE',
                null,
                {
                    Authorization: 'Bearer ' + auth.token
                }
            );
            console.log(props)
            props.onDelete(props.id);
        } catch (err) {
            console.log(err)
        }
    };

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError}/>
            <Modal
                show={showConfirmModal}
                onCancel={cancelDeleteHandler}
                header="Are you sure?"
                footerClass="customer-item__modal-actions"
                footer={
                    <React.Fragment>
                        <Button inverse onClick={cancelDeleteHandler}>
                            CANCEL
                        </Button>
                        <Button danger onClick={confirmDeleteHandler}>
                            DELETE
                        </Button>
                    </React.Fragment>
                }
            >
                <p>
                    Do you want to proceed and delete this place? Please note that it
                    can't be undone thereafter.
                </p>
            </Modal>
            <li className="customer-item">
                <Card className="customer-item__content">
                    {isLoading && <LoadingSpinner asOverlay/>}
                    <div className="customer-item__info">
                        <h2>USERNAME:{props.username}</h2>
                        <h3>EMAIL:{props.email}</h3>
                        <p>DESCRIPTION:{props.description}</p>
                        <p>CREATOR ID:{props.creatorId}</p>
                        <p>LAST UPDATE DATE:{props.updated}</p>
                        <p>CREATION DATE:{props.updated}</p>
                    </div>
                    <div className="customer-item__actions">
                        {auth.isLoggedIn && (
                            <Button to={`/customers/${props.id}`}>EDIT</Button>
                        )}
                        {auth.isLoggedIn && (
                            <Button danger onClick={showDeleteWarningHandler}>
                                DELETE
                            </Button>
                        )}
                    </div>
                </Card>
            </li>
        </React.Fragment>
    );
};

export default Customer;
