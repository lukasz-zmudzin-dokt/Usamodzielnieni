import React from "react";

class Language extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            level: ""
        };
    }

    setName(name) {
        this.setState({
            name: name
        });
    }

    render() {
        return(this);
    }
}

export default Language;