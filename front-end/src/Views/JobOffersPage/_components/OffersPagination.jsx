import React from 'react'
import { Pagination } from 'react-bootstrap';
import OffersPaginationItem from './OffersPaginationItem';

const OffersPagination = ({current, count}) => {
    const links = [
        { path: '',  }
    ]

    return (
        <Pagination>
            <Pagination.First disabled={current === 1}/>
            <Pagination.Prev disabled={current === 1}/>

            {current > 2 && <OffersPaginationItem page={current - 2} />}
            {current > 1 && <OffersPaginationItem page={current - 1} />}
            <Pagination.Item active>{current}</Pagination.Item>
            <OffersPaginationItem page={current + 1} />
            <OffersPaginationItem page={current + 2} />

            <Pagination.Next />
            <Pagination.Last />
        </Pagination>
    )
}

export default OffersPagination
