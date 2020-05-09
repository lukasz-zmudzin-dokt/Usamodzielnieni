import React, {useContext, useEffect, useState} from "react";
import {Alert, Card, Container} from "react-bootstrap";
import { getCVs } from "./functions/getCVs";
import {UserContext} from "context";
import CVList from "./components/CVList";
import {acceptCV} from "./functions/acceptCV";
const CVApprovalPage = () => {
    const context = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [cvs, setCvs] = useState([]);

    useEffect(() => {
        const loadCVs = async(token, setCvs, setLoading, setError) => {
            setLoading(true);
            let res;
            try {
                res = await getCVs(token);
                setCvs(res);
                setLoading(false);
            } catch (e) {
                setCvs([]);
                setLoading(false);
                setError(true);
            }
        };

        loadCVs(context.token, setCvs, setLoading, setError);
    }, [context.token]);

    const cutCV = async (id) => {
        try {
            await acceptCV(context.token, id);
            setCvs(cvs.filter(cv => cv.cv_id !== id));
        } catch(e) {
            return false;
        }
    };

    const message = loading ? (
        <Alert variant="info" className="m-3">Ładuję...</Alert>
    ) : error ? (
        <Alert variant="danger" className="m-3">Ups, wystąpił błąd.</Alert>
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
                            <CVList cvs={cvs} cutCV={cutCV}/>
                        )}
                    </Card.Body>
            </Card>
        </Container>
    );
};

export default CVApprovalPage;