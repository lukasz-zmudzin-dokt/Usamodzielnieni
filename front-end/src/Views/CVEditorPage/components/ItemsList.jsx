import React from "react";
import { Form, Button } from "react-bootstrap";
import Items from 'Views/CVEditorPage/components/Items';

class ItemsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        }
    }

    addItem = (e) => {
        const item = this.props.getItem();
        this.setState(prevState => ({
            items: [...prevState.items, item]
        }))
    }

    cutItem = (e, i) => {
        this.setState(prevState => ({
            items: prevState.items.filter((_, index) => index !== i)
        }));
    }
    
    render() {
        return (
            <div>
                {this.state.items.length > 0 &&
                <Form.Group controlId="">
                    <Items 
                        items={this.state.items}
                        onCutClick={(e, i) => this.cutItem(e, i)}
                        getItemId={this.props.getItemId}
                        getItemName={this.props.getItemName}
                    />
                </Form.Group>
                }
                {this.props.children}
                <Form.Group controlId="">
                    <Button variant="success" onClick={e => this.addItem(e)}>+ Dodaj</Button>
                </Form.Group>
            </div>
        )
    }
}

export default ItemsList;