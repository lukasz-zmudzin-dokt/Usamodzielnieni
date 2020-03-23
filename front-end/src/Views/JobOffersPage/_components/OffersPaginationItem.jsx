import React from 'react';
import { Pagination } from 'react-bootstrap';
import { IndexLinkContainer } from 'react-router-bootstrap';

const OffersPaginationItem = ({page, ...rest}) => (
    <IndexLinkContainer to={`?page=${page}`}>
        <Pagination.Item {...rest}>{page}</Pagination.Item>
    </IndexLinkContainer>
)

export default OffersPaginationItem
