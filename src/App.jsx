import React, { Component } from 'react';
import Header from './components/header/Header.jsx';
import Calendar from './components/calendar/Calendar.jsx';
import { getWeekStartDate, generateWeekRange } from '../src/utils/dateUtils.js';
import './common.scss';

class App extends Component {
  state = {
    weekStartDate: new Date(),
  };

  handlePreviousWeek = () => {
    this.setState((prevState) => ({
      weekStartDate: new Date(
        prevState.weekStartDate.setDate(prevState.weekStartDate.getDate() - 7)
      ),
    }));
  };

  handleNextWeek = () => {
    this.setState((prevState) => ({
      weekStartDate: new Date(
        prevState.weekStartDate.setDate(prevState.weekStartDate.getDate() + 7)
      ),
    }));
  };

  handleToday = () => {
    this.setState({
      weekStartDate: new Date(),
    });
  };

  render() {
    const { weekStartDate } = this.state;
    const weekDates = generateWeekRange(getWeekStartDate(weekStartDate));

    return (
      <>
        <Header
          weekStartDate={weekStartDate}
          onPreviousWeek={this.handlePreviousWeek}
          onNextWeek={this.handleNextWeek}
          onToday={this.handleToday}
        />
        <Calendar weekDates={weekDates} />
      </>
    );
  }
}

export default App;
