import React from 'react';
import './App.css';
import { Alert, Button, Label, Input, FormGroup, Table } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAuthButton: false,
      showSignOutButton: false,
      events: [],
      event:
      {
        eventname: '',
        eventstarttime: '',
        eventstartdate:'',
        eventenddate:'',
        eventendtime: '',
        eventdescription: '',
        sdate:'',
        edate:'',
      },
    };
  }
  handleChange = (e) => {
    let { event } = this.state;
    event[e.target.name] = e.target.value
    this.setState({ event })
  }
  addEvent = () => {
    let sdate1  = `${this.state.event.eventstartdate}T${this.state.event.eventstarttime}:00`;
    let edate1 = `${this.state.event.eventenddate}T${this.state.event.eventendtime}:00`;
    //debugger
    let { events } = this.state;
    this.setState({sdate:sdate1,edate:edate1})
    events.push(this.state.event);
    let tempEvent =
    {
      eventname: '',
      eventstarttime: '',
      eventstartdate:'',
      eventenddate:'',
      eventendtime: '',
      eventdescription: '',
      sdate:'',
      edate:'',
    }
    this.setState({ events, event: tempEvent })
    localStorage.setItem('events', JSON.stringify(this.state.events));
    console.log(events)
    
  }
  add(index, idx) {
    debugger
    console.log(this.state)
    var event = {
      'summary': index.eventname,
      'description': index.eventdescription,
      'start': {
        'dateTime': this.state.sdate,
        'timeZone': 'Asia/Kolkata'
      },
      'end': {
        'dateTime': this.state.edate,
        'timeZone': 'Asia/Kolkata'
      },
      'recurrence': [
        'RRULE:FREQ=DAILY;COUNT=1'
      ],
    };
    
    var request = window.gapi.client.calendar.events.insert({
      'calendarId': 'primary',
      'resource': event
    });
    
    request.execute(function (event) {
      window.appendPre('Event is synced in the google calendar ... CHECK!!: ');
    });
  }
  render() {
    return (
      <div className="container">

        <Alert color="primary">  EVENTS MANAGER </Alert>

        <FormGroup>
          <Label for="exampleName">NAME OF THE EVENT </Label>
          <Input type="text" onChange={this.handleChange} name="eventname" value={this.state.event.eventname} placeholder="Enter the name of the event" />
        </FormGroup>

        <FormGroup>
          <Label >START DATE AND TIME OF THE EVENT</Label>
          <Input type="date" onChange={this.handleChange} name="eventstartdate" value={this.state.event.eventstartdate} />
          <Input type="time" onChange={this.handleChange} name="eventstarttime" value={this.state.event.eventstarttime} />
        </FormGroup>

        

        <FormGroup>
          <Label >END DATE AND TIME OF THE EVENT</Label>
          <Input type="date" onChange={this.handleChange} name="eventenddate" value={this.state.event.eventenddate} />
          <Input type="time" onChange={this.handleChange} name="eventendtime" value={this.state.event.eventendtime} />
        </FormGroup>

        <FormGroup>
          <Label for="exampleSearch">DESCRIPTION OF THE EVENT</Label>
          <Input type="search" onChange={this.handleChange} name="eventdescription" value={this.state.event.eventdescription} placeholder="Describe about the event" />
        </FormGroup>

        <Button color="primary" onClick={this.addEvent}> CREATE EVENT </Button>

        <hr />

        <Alert color="primary">  DETAILS OF ALL THE EVENTS </Alert>


        <Table bordered>  
        <thead>
          <tr>
            <th>NAME</th>
            <th>START DATE & TIME </th>
            <th>END DATE & TIME </th>
            <th>DESCRIPTION</th>
          </tr>
        </thead>
        <tbody>
          {this.state.events.map((event, idx) => (

            <tr key={idx}>
              <td>{event.eventname}</td>
              <td>{event.eventstartdate + event.eventstarttime}</td>
              <td>{event.eventenddate + event.eventendtime}</td>
              <td>{event.eventdescription}</td>
              <td><button onClick={() => this.add(event,idx)}>SYNC TO GCALENDER</button></td>
            </tr>
            ))}
        </tbody>
        </Table>
      </div>
    )
  }
}
export default App;
