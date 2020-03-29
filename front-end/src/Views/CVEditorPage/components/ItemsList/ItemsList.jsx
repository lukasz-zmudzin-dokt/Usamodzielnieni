import React from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Items } from '../';
import "./ItemsList.css";

class ItemsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false
        }
        if (this.props.data === null) {
            this.props.onChange([]);
        }
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

    cutItem = (i) => {
        this.props.onChange(
            this.props.data.filter((_, index) => index !== i)
        );
    }
    
    render() {
        const { data, getItemId, getItemName, children } = this.props;

        if (data === null) return null;

        return (
            <div>
                {data.length > 0 &&
                <Form.Group controlId="items">
                    <Items 
                        items={data}
                        onCutClick={this.cutItem}
                        getItemId={getItemId}
                        getItemName={getItemName}
                    />
                </Form.Group>
                }
                { this.state.error && (<Alert variant="danger">Taka sama pozycja znajduje się już na liście.</Alert>) }
                {children}
                <Button className="itemsList__addButton" variant="success" onClick={this.addItem}>+ Dodaj</Button>
            </div>
        )
    }
}

export default ItemsList;