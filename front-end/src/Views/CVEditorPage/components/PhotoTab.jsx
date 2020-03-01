import React from "react";
import FileInput from "./FileInput";
import CVEditorTab from "./CvEditorTab";
import movie_1 from "../../../assets/movie_1.png";


class PhotoTab extends React.Component {  
    render() {
        return(
            <CVEditorTab
                title="Zdjęcie"
                movie={movie_1}
                onPrevClick={this.props.onPrevClick}
                >
                <FileInput />
            </CVEditorTab>
        );
    }
    
}

export default PhotoTab;