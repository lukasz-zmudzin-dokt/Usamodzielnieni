import React from "react";
import movie_2 from "assets/movie_2.png";
import { CVEditorTab, ActionWithDate } from '../';

const EducationTab = ({ data, onChange, onPrevClick, onNextClick, comments, loading, showComments, validated }) => (
    <CVEditorTab
        title="Edukacja"
        movie={movie_2}
        onPrevClick={onPrevClick}
        onNextClick={onNextClick}
        comments={comments}
        loading={loading}
        showComments={showComments}
    >
        <ActionWithDate 
            data={data}
            onChange={onChange}
            place={{ required: true, minLength: 1, maxLength: 200 }}
            description={{ required: true, minLength: 1, maxLength: 150 }}
            validated={validated}
            required
        />
    </CVEditorTab>
)

export default EducationTab;