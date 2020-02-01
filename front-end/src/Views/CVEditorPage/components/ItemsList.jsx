import React from "react";
import { Button } from "react-bootstrap";
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

    cutItem = (e) => {

    }
    
    render() {
        return (
            <div>
                <Items 
                    items={this.state.items}
                    onCutClick={e => this.cutItem(e)}
                    getItemId={this.props.getItemId}
                    getItemName={this.props.getItemName}
                />
                {this.props.children}
                <Button variant="success" onClick={e => this.addItem(e)}>+ Dodaj</Button>
            </div>
        )
    }
}

export default ItemsList;