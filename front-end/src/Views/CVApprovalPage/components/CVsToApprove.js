import React from "react";
import CVDetails from "./CVDetails";

const CVsToApprove = ({ cvs }) => {
    if(cvs.length > 0) {
        return (
            cvs.map((value) => {
                return (
                    <CVDetails cv={value} key={value.cv_id}/>
                )
            })
        );
    } else {
        return null;
    }
};

export default CVsToApprove;