import React, { useState } from 'react';
import Modal from '../modal/Modal.jsx';
import './header.scss';

const Header = ({
  weekStartDate,
  onPreviousWeek,
  onNextWeek,
  onToday,
  addEvent,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const formatDate = (startDate) => {
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);

    const startMonth = startDate.toLocaleDateString('en-US', {
      month: 'short',
    });
    const startYear = startDate.getFullYear();
    const endMonth = endDate.toLocaleDateString('en-US', { month: 'short' });
    const endYear = endDate.getFullYear();

    if (startMonth === endMonth && startYear === endYear) {
      return `${startMonth} ${startYear}`;
    } else if (startYear === endYear) {
      return `${startMonth} - ${endMonth} ${startYear}`;
    } else {
      return `${startMonth} - ${endMonth} ${startYear} - ${endYear}`;
    }
  };

  return (
    <header className="header">
      <button className="button create-event-btn" onClick={openModal}>
        <i className="fas fa-plus create-event-btn__icon"></i>Create
      </button>
      <div className="navigation">
        <button className="navigation__today-btn button" onClick={onToday}>
          Today
        </button>
        <button
          className="icon-button navigation__nav-icon"
          onClick={onPreviousWeek}
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        <button
          className="icon-button navigation__nav-icon"
          onClick={onNextWeek}
        >
          <i className="fas fa-chevron-right"></i>
        </button>
        <span className="navigation__displayed-month">
          {formatDate(weekStartDate)}
        </span>
      </div>

      {isModalOpen && <Modal closeModal={closeModal} addEvent={addEvent} />}
    </header>
  );
};

export default Header;
