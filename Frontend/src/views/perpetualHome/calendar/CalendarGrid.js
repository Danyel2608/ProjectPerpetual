import React, { useState, useEffect } from 'react';
import './CalendarGrid.css';

const CalendarGrid = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [reservedDates, setReservedDates] = useState([]);

  useEffect(() => {
    fetchReservedDates();
  }, []);

  const fetchReservedDates = async () => {
    try {
      const response = await fetch('http://localhost:8001/dates/availables');
      if (response.ok) {
        const data = await response.json();
        setReservedDates(data);
        setLoading(false);
      } else {
        console.error('Error fetching reserved dates:', response.status);
      }
    } catch (error) {
      console.error('Error fetching reserved dates:', error);
    }
  };

  const handlePrevMonth = () => {
    setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1));
  };

  const daysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const startDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const isReserved = (day) => {
    if (loading) return false;
    const formattedCurrentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return reservedDates.some(reservedDate => {
      const formattedReservedDate = new Date(reservedDate);
      return (
        formattedReservedDate.getDate() === formattedCurrentDate.getDate() &&
        formattedReservedDate.getMonth() === formattedCurrentDate.getMonth() &&
        formattedReservedDate.getFullYear() === formattedCurrentDate.getFullYear()
      );
    });
  };


  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  return (
    <div className='calendar-container'>
      <div className='nav-buttons'>
        <button onClick={handlePrevMonth}>Mes Anterior</button>
        <h3>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h3>
        <button onClick={handleNextMonth}>Mes Siguiente</button>
      </div>
      <div className="info">
        <p className="reserved-info">Días reservados</p>
        <p className='today-info'>Hoy</p>
      </div>
      <table className='calendar'>
        <thead>
          <tr>
            <th>L</th>
            <th>M</th>
            <th>X</th>
            <th>J</th>
            <th>V</th>
            <th>S</th>
            <th>D</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(6)].map((_, weekIndex) => {
            const days = [...Array(7)].map((_, dayIndex) => {
              const day = (weekIndex * 7) + dayIndex - startDayOfMonth(currentDate) + 1;
              const currentDay = day > 0 && day <= daysInMonth(currentDate) ? day : null;
              const formattedCurrentDate = currentDay ? new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDay) : null;
              let tdClassName = '';
              if (currentDay) {
                if (isToday(formattedCurrentDate)) tdClassName += ' today';
                if (isReserved(currentDay)) tdClassName += ' reserved';
                if (!isReserved(currentDay)) tdClassName += ' empty';
              }
              return (
                <td className={tdClassName.trim()} key={dayIndex}>
                  {currentDay}
                </td>
              );
            });
            return <tr key={weekIndex}>{days}</tr>;
          })}
        </tbody>

      </table>
    </div>
  );
};

export default CalendarGrid;
