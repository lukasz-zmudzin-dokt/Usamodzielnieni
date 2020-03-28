import React from "react";
import { Form, Button } from "react-bootstrap";
import { Items } from '.';

class ItemsList extends React.Component {
    constructor(props) {
        super(props);

        this.props.onChange([]);
    }

    addItem = (e) => {
        const item = this.props.getItem();

        this.props.onChange([...this.props.data, item])
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
                {children}
                <Form.Group controlId="">
                    <Button variant="success" onClick={e => this.addItem(e)}>+ Dodaj</Button>
                </Form.Group>
            </div>
        )
    }
}

export default ItemsList;