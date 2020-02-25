import React from "react";
import ReactDOM from "react-dom";
import DOMElement from "react-dom";
import { Container, Row, Col } from "react-bootstrap";
import "./style.css";
import { Button } from "react-bootstrap";
import OfferHeader from "./OfferHeader";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
/*const offers = [
    {
        title: "Stolarz poszukiwany!",
        description: "Do naszego zakładu potrzebujemy osoby, która ma chęć rąbać drewno! To możesz być ty!!!",
        company_name: "Rębacze z Cintry sp. z o.o.",
        first_name: "Jarosław",
        last_name: "Psikuta",
        email: "paniewidzisztamsnakońcu@gmail.com",
        phone: "133792137"
    }
];*/


class JobOffersPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        username: "user1",
        role: "common",
        firstName: "Jan",
        lastName: "Kowalski",
        email: "jan.kowalski@pw.edu.pl",
        phoneNumber: "+48123456789"
      },
      offers: [
        {
          title: "Stolarz poszukiwany!",
          description:
            "Do naszego zakładu potrzebujemy osoby, która ma chęć rąbać drewno! To możesz być ty!!!",
          companyName: "Rębacze z Cintry sp. z o.o.",
          firstName: "Jarosław",
          lastName: "Psikuta",
          email: "paniewidzisztamsnakońcu@gmail.com",
          phone: "133792137"
        },
        {
          title: "Pszczelarz poszukiwany!",
          description:
            "Do naszego zakładu potrzebujemy osoby, która ma chęć wyciagac miody pszczolom! To możesz być ty!!!",
          companyName: "Miody sp. z o.o.",
          firstName: "Jarosław",
          lastName: "Psikuta",
          email: "paniewidzisztamsnakońcu@gmail.com",
          phone: "133792137"
        }
      ],
      showModal: false,
      selectedID: undefined
    };
  }

  handleClick = e => {
      console.log(this.state.offers[e.target.id].description);
      this.setState({
        showModal: true,
        selectedID: e.target.id
      });
      
  }

  mapJobOffers = (offer, index) => {
    return (
      <li>
      <OfferHeader
        post={this.state.offers[index].title}
        company={this.state.offers[index].companyName} />
      <Button id={index} onClick={e => this.handleClick(e)}>Pokaż szczegóły</Button>
      </li>
    );
  };

  makeBody = (index) => {
    let body = "";
    body += this.state.offers[this.state.selectedID].description;
    body += "\nFIRMA: " + this.state.offers[this.state.selectedID].companyName;
    body += "\ne-mail: " + this.state.offers[this.state.selectedID].email;
    body += "\ntel: " + this.state.offers[this.state.selectedID].phone;

    return body;
  }

  render() {
    console.log("JobOffersPage");
    return (
      <Container className="jobOffersPage">
        <ul>{this.state.offers.map((offer, index) => this.mapJobOffers(offer, index))}</ul>
        <Modal
        size="lg"
        show={this.state.showModal}
        onHide={() => this.setState({showModal: false})}
        aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            {this.state.selectedID === undefined ? 0 : this.state.offers[this.state.selectedID].title}
          </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.state.selectedID === undefined ? 0 : this.makeBody(this.state.selectedID)}
          </Modal.Body>
        </Modal>
      </Container>

      
    );
  }
}

export default JobOffersPage;
