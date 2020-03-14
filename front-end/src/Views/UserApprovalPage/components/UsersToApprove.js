import React from "react";
import {CardDeck} from "react-bootstrap";
import UserToApprove from "./UserToApprove";

const UsersToApprove = ({ users })  => {
    return (
        <CardDeck>
            {users.map((value) => {
                return (
                    <UserToApprove user={value} key={value.id} />
                )
            })}
        </CardDeck>
    );
};

export default UsersToApprove;