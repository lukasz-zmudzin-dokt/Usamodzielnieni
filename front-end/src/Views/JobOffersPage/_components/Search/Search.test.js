import React from "react";
import { render } from "@testing-library/react";
import Search from "Views/JobOffersPage/_components/Search";
import renderer from "react-test-renderer";

const offers = [
  {
    id: "1",
    title: "Stolarz poszukiwany!",
    description:
      "Do naszego zakładu potrzebujemy osoby, która ma chęć rąbać drewno! To możesz być ty!!!",
    companyName: "Rębacze z Cintry sp. z o.o.",
    firstName: "Jarosław",
    lastName: "Psikuta",
    email: "paniewidzisztamsnakońcu@gmail.com",
    phone: "133792137",
    voivodeship: "Lubelskie",
    type: "Szkolenie",
    earnings: "Bezpłatne"
  },
  {
    id: "2",
    title: "Pszczelarz poszukiwany!",
    description:
      "Do naszego zakładu potrzebujemy osoby, która ma chęć wyciagac miody pszczolom! To możesz być ty!!!",
    companyName: "Miody sp. z o.o.",
    firstName: "Jarosław",
    lastName: "Psikuta",
    email: "paniewidzisztamsnakońcu@gmail.com",
    phone: "133792137",
    voivodeship: "Lubelskie",
    type: "Praca",
    earnings: "Płatne"
  }
];

describe("Search", () => {
  it("should render without crashing", () => {
    render(<Search offers={offers} setFilter={() => null} />);
  });
});

it("renders correctly", () => {
  const search = renderer
    .create(<Search offers={offers} setFilter={() => null} />)
    .toJSON();
  expect(search).toMatchSnapshot();
});
