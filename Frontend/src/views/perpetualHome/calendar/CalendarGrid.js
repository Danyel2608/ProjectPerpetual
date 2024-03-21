import React, { useState, useEffect } from 'react';
import './CalendarGrid.css';

const Calendar = () => {
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [calendarData, setCalendarData] = useState([]);
  const [reservedDays, setReservedDays] = useState([]);

  useEffect(() => {
    fetchCalendarData();
  }, [month, year]);

  const fetchCalendarData = async () => {
    try {
      const response = await fetch('http://localhost:8001/dates/availables', { method: "GET" });
      const data = await response.json();
      if (response.ok) {
        setCalendarData(data);
        setReservedDays(data);
      }
    } catch (error) {
      console.error('Error fetching calendar data:', error);
    }
  };

  //Control del dia en curso y creacion del calendario
  const today = new Date().getDate();
  const monthNow = new Date().getMonth();

  const daysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
  };

  const startDayOfMonth = (month, year) => {
    return new Date(year, month - 1, 1).getDay();
  };

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const handlePrevMonth = () => {
    if (month === 1) {
      setMonth(12);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 12) {
      setMonth(1);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };
  const formatDate = (day, month, year) => {
    const formattedDay = day < 10 ? '0' + day : day;
    const formattedMonth = month < 10 ? '0' + month : month;
    return `${formattedDay}/${formattedMonth}/${year}`;
  };

  return (
    <div className='allCalendar'>
      <h1 className='citas'>Citas Disponibles</h1>
      <div className='tableCalendar'>
        <div className='navButtons'>
          <button onClick={handlePrevMonth}>Mes Anterior</button>
          <h3>{monthNames[month - 1]} {year}</h3>
          <button onClick={handleNextMonth}>Mes Siguiente</button>
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
            {[...Array(6)].map((_, weekIndex) => (
              <tr key={weekIndex}>
                {[...Array(7)].map((_, dayIndex) => {
                  const day = (weekIndex * 7) + dayIndex - startDayOfMonth(month, year);
                  const isToday = day === today && month === monthNow + 1;
                  const formattedDay = formatDate(day, month, year);
                  const isReserved = reservedDays.includes(formattedDay);
                  let tdClassName = '';
                  if (isToday) tdClassName += 'today';
                  if (isReserved) tdClassName += ' reserved';

                  return (
                    <td className={tdClassName.trim()} key={dayIndex}>
                      {day > 0 && day <= daysInMonth(month, year) ? day : ''}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Calendar;
