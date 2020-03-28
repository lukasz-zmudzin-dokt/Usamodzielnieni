import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import { ItemsList } from '.';
import DatePicker, { registerLocale } from "react-datepicker";
import polish from "date-fns/locale/pl";

registerLocale("pl", polish);

class ActionWithDate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newAction: {
                startTime: undefined,
                endTime: undefined,
                place: '',
                description: ''
            }
        }
    }

    getAction = () => {
        const action = this.state.newAction;
        this.setState({
            newAction: { startTime: new Date(), endTime: undefined, place: '', description: '' }
        });
        return action;
    }
    getActionId = (action) => `${action.place}_${action.description}`
    getActionName = (action) => {      
        const dateToString = (date) => {
            if (!date) {
                return "teraz";
            }
            const month = date.getMonth() + 1;
            const year = date.getYear() + 1900;
            return (month < 10 ? "0" : "") + month + "/" + year;
        }
      
        return `${action.description} od: ${dateToString(action.startTime)} do: ${dateToString(action.endTime)} (${action.place})`
    };
    onChange = (e, key) => {
        const { value } = e.target;
        this.setState(prevState => ({
            newAction: { ...prevState.newAction, [key]: value }
        }))
    }
    clear = () => {
        this.setState({
            newAction: {
                startTime: undefined,
                endTime: undefined,
                place: '',
                description: ''
            }
        });
    }

    render() {
        return (
            <ItemsList
                getItemId={this.getActionId} getItemName={this.getActionName} getItem={this.getAction}
                data={this.props.data} onChange={this.props.onChange} clear={this.clear}
            >
                <Row>
                    <Form.Group as={Col} controlId="">
                        <Form.Label>Od:</Form.Label>
                        <DatePicker
                            className="form-control"
                            locale="pl"
                            dateFormat=" MM.yyyy"
                            placeholderText="Data rozpoczęcia"
                            selected={this.state.newAction.startTime}
                            onChange={startTime => this.setState(prevState => ({ newAction: { ...prevState.newAction, startTime } }))}
                            showMonthYearPicker
                        />
                    </Form.Group>
                    <Form.Group as={Col} controlId="">
                        <Form.Label>Do:</Form.Label>
                        <DatePicker
                            className="form-control"
                            locale="pl"
                            dateFormat=" MM.yyyy"
                            placeholderText="Data zakończenia"
                            selected={this.state.newAction.endTime}
                            onChange={endTime => this.setState(prevState => ({ newAction: { ...prevState.newAction, endTime } }))}
                            showMonthYearPicker
                        />
                    </Form.Group>
                </Row>
                <Form.Group controlId="">
                    <Form.Label>Miejsce:</Form.Label>
                    <Form.Control
                        inline
                        type="text"
                        placeholder="Nazwa szkoły/miejsca pracy"
                        value={this.state.newAction.place}
                        onChange={e => this.onChange(e, 'place')}
                    />
                </Form.Group>
                <Form.Group controlId="">
                    <Form.Label>Opis:</Form.Label>
                    <Form.Control
                        inline
                        type="text"
                        placeholder="Profil/stanowisko ..."
                        value={this.state.newAction.description}
                        onChange={e => this.onChange(e, 'description')}
                    />
                </Form.Group>
            </ItemsList>
        );
    }
}

export default ActionWithDate;
