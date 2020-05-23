import React from "react";
import {Card, Container, CardColumns, Button, Alert} from "react-bootstrap";
import PhoneCard from "./components/PhoneCard";
import {UserContext} from "context/UserContext";
import {withAlertContext} from "components";
import {userTypes} from "constants/userTypes";
import {NewContact} from "./components/NewContact";
import proxy from "config/api";
import {staffTypes} from "constants/staffTypes";

class ContactPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false,
      phoneList: [],
      loading: false
    }
  }

  componentDidMount() {
    this.setState({
      loading: true
    });
    this.getContacts();
  }

  getContacts = async() => {
    try {
      const list = await this.loadData();
      const phoneList = list.map(item => ({
        id: item.id,
        name: item.title,
        phone: item.phone_number
      }));
      this.setState({
        phoneList: phoneList
      });
    } catch(e) {
      console.log(e);
      this.props.alertContext.showAlert("Wystąpił błąd podczas pobierania listy kontaktów.");
    } finally {
      this.setState({
        loading: false
      })
    }
  };

  loadData = async () => {
    const url = proxy.contact + "contacts/";
    const res = await fetch(url, {method: "GET", headers: {
      "Content-Type": "application/json"
      }});

    if (res.status === 200) {
      return await res.json();
    } else {
      throw res.status;
    }
  };

  toggleModal = (val) => {
    this.setState({
      modalShow: val
    });
  };

  handleClick = (e) => {
    this.setState({
      modalShow: true
    });
  };

  setPhoneList = (contact) => {
    let list = this.state.phoneList;
    list.push(contact);
    this.setState( {
      phoneList: list
    });
  };

  cutPhone = (contactId) => {
    let list = this.state.phoneList;
    const idx = list.findIndex(item => item.id === contactId);
    if (idx !== -1) {
      list.splice(idx, 1);
      this.setState({
        phoneList: list
      });
    }
  };

  render() {
    const {handleClick} = this;

    return this.state.loading ? (
        <Card.Body>
          <Alert variant="info">Ładowanie...</Alert>
        </Card.Body>
    ) : (
      <Container>
        <Card className="contact_page_card">
          <Card.Header as="h2" className="contact_page_title">
            Lista przydatnych telefonów
          </Card.Header>
          <Card.Body className="bg_card">
            {
              this.context.type && this.context.type === userTypes.STAFF && this.context.data.group_type.includes(staffTypes.BLOG_MODERATOR) ? (
                  <Button variant="primary" className="mb-3" onClick={handleClick}>Dodaj kontakt</Button>
              ) : null
            }
            {this.state.phoneList.length === 0 ?
                <Alert variant="info">Brak kontaktów do wyświetlenia.</Alert> : (
                    <CardColumns>
                      {this.state.phoneList.map((contact) => (
                      <PhoneCard
                          key={contact.name + contact.phone}
                          contact={contact}
                          cutItem={this.cutPhone}
                          user={this.context}
                          alertC={this.props.alertContext}
                      />
                      ))}
                    </CardColumns>
                )
            }
          </Card.Body>
        </Card>
        {this.state.modalShow ? (
            <NewContact
                user={this.context}
                setContacts={this.setPhoneList}
                setShow={this.toggleModal}
                show={this.state.modalShow}
                alertC={this.props.alertContext}
            />
        ) : null}
      </Container>
    );
  }
}

ContactPage.contextType = UserContext;

export default withAlertContext(ContactPage);
