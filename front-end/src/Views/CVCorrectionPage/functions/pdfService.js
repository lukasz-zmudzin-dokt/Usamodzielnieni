export const showNextPage = (component) => {
    if (component.state.documentCurrentPage < component.state.numPages)
        component.setState(state =>({
            documentCurrentPage: state.documentCurrentPage + 1
        }));
};

export const showPrevPage = (component) => {
    if (component.state.documentCurrentPage > 1)
        component.setState(state =>({
            documentCurrentPage: state.documentCurrentPage - 1
        }));
};