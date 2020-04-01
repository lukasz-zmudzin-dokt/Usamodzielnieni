import React from "react";
import NoCVs from "./NoCVs";
import CVLegend from "./CVLegend";
import CVsToApprove from "./CVsToApprove";

const CVApprovalBody = ({ cvs }) => {
    return (
        <div>
            <NoCVs cvs={cvs} />
            <CVLegend cvs={cvs} />
            <CVsToApprove cvs={cvs} />
        </div>
    )
};

export default CVApprovalBody;