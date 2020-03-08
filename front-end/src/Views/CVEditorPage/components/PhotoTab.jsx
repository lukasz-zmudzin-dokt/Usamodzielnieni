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
        if(this.fileInput.files[0] && this.fileInput.files[0].type.substring(0, 5) === 'image') {
            this.props.onChange(this.fileInput.files[0]);
        }
        else {
            e.target.value = null;
            alert('BŁĄD: Niewłaściwy typ pliku - plik musi być obrazem.');
        }

        console.log(this.fileInput.files[0]);
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
                        ref={(ref) => this.fileInput = ref}
                        onChange={this.onChange}
                    />
                </Form.Group>
            </CVEditorTab>
        );
    }
    
}

export default PhotoTab;