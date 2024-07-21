import React, { Component } from 'react';
import Header from './components/header/Header.jsx';
import Calendar from './components/calendar/Calendar.jsx';
import { getWeekStartDate, generateWeekRange } from '../src/utils/dateUtils.js';
import './common.scss';
import { getEventList, deleteEvent } from './gateway/events';

class App extends Component {
  state = {
    weekStartDate: new Date(),
    events: [],
  };

  componentDidMount() {
    this.fetchEvents();
  }

  fetchEvents = () => {
    getEventList().then((events) => {
      const parsedEvents = events.map(event => ({
        ...event,
        dateFrom: new Date(event.dateFrom),
        dateTo: new Date(event.dateTo),
      }))
      this.setState({ events: parsedEvents });
    });
  };

  handlePreviousWeek = () => {
    this.setState(
      (prevState) => ({
        weekStartDate: new Date(
          prevState.weekStartDate.setDate(prevState.weekStartDate.getDate() - 7)
        ),
      }),
      this.fetchEvents
    );
  };

  handleNextWeek = () => {
    this.setState(
      (prevState) => ({
        weekStartDate: new Date(
          prevState.weekStartDate.setDate(prevState.weekStartDate.getDate() + 7)
        ),
      }),
      this.fetchEvents
    );
  };

  handleToday = () => {
    this.setState(
      {
        weekStartDate: new Date(),
      },
      this.fetchEvents
    );
  };

  addEvent = (newEvent) => {
    this.setState((prevState) => ({
      events: [...prevState.events, newEvent],
    }));
  };

  removeEvent = (eventId) => {
    deleteEvent(eventId).then(() => {
      this.setState((prevState) => ({
        events: prevState.events.filter((event) => event.id !== eventId),
      }));
    });
  };

  render() {
    const { weekStartDate, events } = this.state;
    const weekDates = generateWeekRange(getWeekStartDate(weekStartDate));

    return (
      <>
        <Header
          weekStartDate={weekStartDate}
          onPreviousWeek={this.handlePreviousWeek}
          onNextWeek={this.handleNextWeek}
          onToday={this.handleToday}
          addEvent={this.addEvent}
        />
        <Calendar
          weekDates={weekDates}
          events={events}
          removeEvent={this.removeEvent}
        />
      </>
    );
  }
}

export default App;
