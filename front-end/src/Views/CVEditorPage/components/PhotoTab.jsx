import React from "react";
import { Form, Col } from "react-bootstrap";
import CVEditorTab from "./CvEditorTab";
import movie_1 from "../../../assets/movie_1.png";


class PhotoTab extends React.Component {  
    
    constructor(props) {
        super(props);
        this.fileInput = React.createRef();
    }
    
    onChange = (e) => {
        const { name } = e.target;

        this.props.onChange({[this.props.data]: this.fileInput.current.files[0]});  //this.fileInput.current.files[0].name 
    }
    
    render() {
        return(
            <CVEditorTab
                title="Zdjęcie"
                movie={movie_1}
                onPrevClick={this.props.onPrevClick}
                >
                <Form.Group as={Col} controlId="">
                    <Form.Label>
                        Wybierz zdjęcie:
                    </Form.Label>
                    <Form.Control
                        name="photo"
                        inline
                        type="file"
                        ref={this.fileInput}
                        onChange={this.onChange}
                    />
        </Form.Group>
            </CVEditorTab>
        );
    }
    
}

export default PhotoTab;