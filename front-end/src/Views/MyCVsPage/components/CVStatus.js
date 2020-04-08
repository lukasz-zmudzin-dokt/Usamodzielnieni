import React from "react";

const CVStatus = ({ wants_verification, is_verified }) => {
    return wants_verification ? is_verified ? "zweryfikowane" : "czeka na weryfikację" : "nie czeka na weryfikację";
};

export default CVStatus;