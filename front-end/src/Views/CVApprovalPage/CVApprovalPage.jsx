import React from "react";
import { Card, Container } from "react-bootstrap";
import "Views/MyOffersPage/style.css";
import CVLegend from "./components/CVLegend";
import CVDetails from "./components/CVDetails";
import NoCVs from "./components/NoCVs";
import { getCVs } from "./functions/getCVs";
import {UserContext} from "../../context/UserContext";

class CVApprovalPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { cvs: [] };
    }
    static ContextType = UserContext;

    /*  will change with backend in the future
    componentDidMount() {
        getCVs(this.context.token).then(response => this.setState({ cvs: response.results}));
    }
    */

    render() {
        return (
            <Container>
                <div className="background">
                    <Card className="main-card no-border">
                        <Card.Header className="border pb-4"><h3>CV do przejrzenia</h3></Card.Header>
                        <Card.Body className="border">
                            <NoCVs cvs={this.state.cvs} />
                            <CVLegend cvs={this.state.cvs} />
                            {this.state.cvs.map((value) => {
                                return (
                                    <CVDetails cv={value} key={value.id}/>
                                )
                            })}
                        </Card.Body>
                    </Card>
                </div>
            </Container>
        )
    };
}

export default CVApprovalPage;