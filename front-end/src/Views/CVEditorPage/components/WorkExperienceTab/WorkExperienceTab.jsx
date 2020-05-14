import React from "react";
import movie_3 from "assets/movie_3.png";
import { CVEditorTab, ActionWithDate } from "../";

const WorkExperienceTab = ({ data, onChange, onPrevClick, onNextClick, comments, loading, error, showComments, validated }) => (
    <CVEditorTab
        title="Doświadczenie zawodowe"
        movie={movie_3}
        onPrevClick={onPrevClick}
        onNextClick={onNextClick}
        comments={comments}
        loading={loading}
        error={error}
        showComments={showComments}
    >
        <ActionWithDate
            data={data}
            onChange={onChange}
            place={{ required: true, minLength: 1, maxLength: 50 }}
            description={{ required: true, minLength: 1, maxLength: 400 }}
            validated={validated}
        />
    </CVEditorTab>
)

export default WorkExperienceTab;