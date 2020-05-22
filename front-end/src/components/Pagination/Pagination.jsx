import React from "react";
import { Pagination } from "react-bootstrap";
import { IndexLinkContainer } from "react-router-bootstrap";

const OffersPagination = ({ current, max }) => {
  const addLinkWhenActive = (item, page, isActive, arrowId) => {
    return isActive ? (
      <IndexLinkContainer
        key={`link_${page}${arrowId && arrowId}`}
        to={`?page=${page}`}
      >
        {item}
      </IndexLinkContainer>
    ) : (
      item
    );
  };

  const items = [];
  for (let p = Math.max(1, current - 2); p <= Math.min(max, current + 2); p++) {
    const item = (
      <Pagination.Item key={p} active={p === current}>
        {p}
      </Pagination.Item>
    );
    items.push(addLinkWhenActive(item, p, p !== current));
  }

  return (
    <Pagination className="offersPagination mb-0 justify-content-center">
      {addLinkWhenActive(
        <Pagination.First disabled={current === 1} />,
        1,
        current !== 1,
        1
      )}
      {addLinkWhenActive(
        <Pagination.Prev disabled={current === 1} />,
        current - 1,
        current !== 1,
        2
      )}

      {items}

      {addLinkWhenActive(
        <Pagination.Next disabled={current === max} />,
        current + 1,
        current !== max,
        3
      )}
      {addLinkWhenActive(
        <Pagination.Last disabled={current === max} />,
        max,
        current !== max,
        4
      )}
    </Pagination>
  );
};

export default OffersPagination;
