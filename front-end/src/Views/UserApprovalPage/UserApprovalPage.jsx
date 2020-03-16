import React from "react";
import "./style.css";
import {Card, Container} from "react-bootstrap";
import UsersToApprove from "./components/UsersToApprove";
import NoUsers from "./components/NoUsers";

class UserApprovalPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { users: [] };
    }

    render() {
        return(
            <Container>
                <div className="background">
                    <Card className="users-approval-card no-border">
                        <Card.Header className="border pb-4"><h3>Użytkownicy do akceptacji</h3></Card.Header>
                        <Card.Body className="border">
                            <NoUsers users={this.state.users} />
                            <UsersToApprove users={this.state.users} />
                        </Card.Body>
                    </Card>
                </div>
            </Container>
        );
    }
}

export default UserApprovalPage;