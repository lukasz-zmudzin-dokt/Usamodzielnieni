import React, {useContext, useEffect, useState} from "react";
import {Alert, Card, Container} from "react-bootstrap";
import { getCVs } from "./functions/getCVs";
import {UserContext,AlertContext} from "context";
import CVList from "./_components/CVList";

const CVApprovalPage = () => {
    const context = useContext(UserContext);
    const contextA = useContext(AlertContext);
    const [loading, setLoading] = useState(false);
    const [cvs, setCvs] = useState([]);

    useEffect(() => {
        const loadCVs = async(token) => {
            setLoading(true);
            let res;
            try {
                res = await getCVs(token);
                setCvs(res);
                setLoading(false);
            } catch (e) {
                setCvs([]);
                setLoading(false);
                contextA.changeMessage("Nie udało się załadować CV.")
                contextA.changeVisibility();
            }
        };

        loadCVs(context.token);
    }, [context.token]);

    const message = loading ? (
        <Alert variant="info" className="m-3">Ładuję...</Alert>
    ) : cvs.length === 0 ? (
        <Alert variant="info" className="m-3">Brak CV do akceptacji.</Alert>
    ) : null;

    return (
        <Container className="pt-4">
            <Card>
                <Card.Header as="h2">CV do akceptacji</Card.Header>
                    <Card.Body className="p-0">
                        {message ? (
                            message
                        ) : (
                            <CVList cvs={cvs} />
                        )}
                    </Card.Body>
            </Card>
        </Container>
    );
};

export default CVApprovalPage;