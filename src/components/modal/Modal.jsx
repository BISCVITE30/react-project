import React, { Component } from 'react';
import './modal.scss';
import { createEvent } from '../../gateway/events';

class Modal extends Component {
  handleChange = (event) => {};

  handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const { date, startTime, endTime, title, description } = Object.fromEntries(
      formData.entries()
    );

    const eventObject = {
      id: Math.random(),
      title,
      description,
      dateFrom: new Date(`${date}T${startTime}`),
      dateTo: new Date(`${date}T${endTime}`),
    };

    if (!title || !description || !date || !startTime || !endTime) {
      alert('Fill in the field');
      return;
    }

    try {
      createEvent(eventObject).then(() => {
        this.props.addEvent(eventObject);
        this.props.closeModal();
      });
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  render() {
    return (
      <div className="modal overlay">
        <div className="modal__content">
          <div className="create-event">
            <button
              className="create-event__close-btn"
              onClick={this.props.closeModal}
            >
              +
            </button>
            <form className="event-form" onSubmit={this.handleSubmit}>
              <input
                type="text"
                name="title"
                placeholder="Title"
                className="event-form__field"
              />
              <div className="event-form__time">
                <input type="date" name="date" className="event-form__field" />
                <input
                  type="time"
                  name="startTime"
                  className="event-form__field"
                  onChange={this.handleChange}
                />
                <span>-</span>
                <input
                  type="time"
                  name="endTime"
                  className="event-form__field"
                />
              </div>
              <textarea
                name="description"
                placeholder="Description"
                className="event-form__field"
              ></textarea>
              <button type="submit" className="event-form__submit-btn">
                Create
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
