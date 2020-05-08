import { Accordion, Card } from "react-bootstrap";
import React from "react";
import UserToApprove from "./UserToApprove";

const UserDetails = ({ users, activeUser, setActiveUser }) => {

    return (
        <Accordion>
            {users.map((user) =>
                <Card className="border-left-0 border-right-0 border-bottom-0" key={user.id}>
                    <Accordion.Toggle as={Card.Header} eventKey={user.id} onClick={e => setActiveUser(user.id)} >
                        {user.username} ({user.type})
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={user.id}>
                        <UserToApprove user={user} key={user.id} activeUser={activeUser} />
                    </Accordion.Collapse>
                </Card>
            )}
        </Accordion>
    );
};

export default UserDetails;