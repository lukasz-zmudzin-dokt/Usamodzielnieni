import React from 'react'
import { Pagination } from 'react-bootstrap';
import { IndexLinkContainer } from 'react-router-bootstrap';
import './OffersPagination.css';

const OffersPagination = ({current, max}) => {
    const items = [];
    for (let p = Math.max(1, current - 2); p <= Math.min(max, current + 2); p++) {
        items.push(
            <IndexLinkContainer key={p} to={`?page=${p}`}>
                <Pagination.Item active={p === current}>{p}</Pagination.Item>
            </IndexLinkContainer>
        )
    }

    return (
        <Pagination className="offersPagination">
            <IndexLinkContainer to={`?page=${1}`}>
                <Pagination.First disabled={current === 1}/>
            </IndexLinkContainer>
            <IndexLinkContainer to={`?page=${current - 1}`}>
                <Pagination.Prev disabled={current === 1}/>
            </IndexLinkContainer>

            {items}

            <IndexLinkContainer to={`?page=${current + 1}`}>
                <Pagination.Next disabled={current === max}/>
            </IndexLinkContainer>
            <IndexLinkContainer to={`?page=${max}`}>
                <Pagination.Last disabled={current === max}/>
            </IndexLinkContainer>
        </Pagination>
    )
}

export default OffersPagination
