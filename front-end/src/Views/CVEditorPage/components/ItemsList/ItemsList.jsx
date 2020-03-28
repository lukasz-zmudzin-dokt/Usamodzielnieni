import React from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Items } from '../';

class ItemsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false
        }
        this.props.onChange([]);
    }

    addItem = (e) => {
        const { data, getItemId, getItem } = this.props;
        const item = getItem();

        if (data.find(dt => getItemId(dt) === getItemId(item))) {
            this.setState({ error: true });
        } else {
            this.setState({ error: false });
            this.props.onChange([...this.props.data, item])
            this.props.clear();
        }
    }

    cutItem = (e, i) => {
        this.props.onChange([
            this.props.data.filter((_, index) => index !== i)
        ]);
    }
    
    render() {
        const { data, getItemId, getItemName, children } = this.props;

        if (data === null) return null;

        return (
            <div>
                {data.length > 0 &&
                <Form.Group controlId="">
                    <Items 
                        items={data}
                        onCutClick={(e, i) => this.cutItem(e, i)}
                        getItemId={getItemId}
                        getItemName={getItemName}
                    />
                </Form.Group>
                }
                { this.state.error && (<Alert variant="danger">Taka sama pozycja znajduje się już na liście.</Alert>) }
                {children}
                <Form.Group controlId="">
                    <Button variant="success" onClick={e => this.addItem(e)}>+ Dodaj</Button>
                </Form.Group>
            </div>
        )
    }
}

export default ItemsList;