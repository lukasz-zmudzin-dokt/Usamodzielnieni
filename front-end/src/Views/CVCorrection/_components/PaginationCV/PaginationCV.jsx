import React from "react";
import { Pagination, Row } from "react-bootstrap";

const PagginationCV = ({ setActivePage, activePage, pages }) => {
  const numberToArray = () => {
    const array = [];
    for (let i = 1; i <= pages; i++) {
      array.push(i);
    }
    return array;
  };

  const mapItems = numberToArray().map((number) => (
    <Pagination.Item
      active={number === activePage}
      onClick={() => setActivePage(number)}
      key={number}
    >
      {number}
    </Pagination.Item>
  ));
  return (
    <Row className="justify-content-center align-items-end ml-0 mr-0 ">
      <Pagination className="mb-0 mt-3">
        <Pagination.First
          disabled={activePage === 1}
          onClick={() => setActivePage(1)}
        />
        <Pagination.Prev
          disabled={activePage === 1}
          onClick={() => setActivePage(activePage - 1)}
        />
        {mapItems}
        <Pagination.Next
          disabled={pages === activePage}
          onClick={() => setActivePage(activePage + 1)}
        />
        <Pagination.Last
          disabled={activePage === pages}
          onClick={() => setActivePage(pages)}
        />
      </Pagination>
    </Row>
  );
};

export default PagginationCV;
