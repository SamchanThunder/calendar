import { useEffect,useState } from 'react';
import './App.css';

function App() {
  const columnArray = Array.from({ length: 6 }, (_, index) => index);
  const rowArray = Array.from({ length: 7 }, (_, index) => index);
  const currentDate = new Date();
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [daysOfMonth, setDaysOfMonth] = useState([[1, 2, 3, 4, 5, 6, 7], [8, 9, 10, 11, 12, 13, 14], [15, 16, 17, 18, 19, 20, 21], [22, 23, 24, 25, 26, 27, 28], [29, 30, 31, 32, 33, 34, 35], [36, 37, 38, 39, 40, 41, 42]])
  const months = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];

  useEffect( () => {
    changeDays();
  }, [currentMonth, currentYear]);

  function switchMonth(x){
    if(currentMonth === 0 && x === -1){
      setCurrentMonth(currentMonth + 11);
      setCurrentYear(currentYear - 1);
    }else if(currentMonth === 11 && x === 1){
      setCurrentMonth(currentMonth - 11);
      setCurrentYear(currentYear + 1);
    }else{
      setCurrentMonth(currentMonth + x);
    }
  }

  function whatDayIsIt(x,y){
    if(daysOfMonth[x][y] != null  && daysOfMonth[x][y] !== ""){
      alert("That is " + months[currentMonth] + " " + daysOfMonth[x][y] + ", " + currentYear);  
    }
  }

  function changeDays() {
    let tempDate = new Date(currentYear, currentMonth, 1);
    let daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    let firstDay = tempDate.getDay();
  
    let finalArray = [];
    let emptyArray = [];
    let trackDay = 1;
  
    for (let i = 0; i < firstDay; i++) {
      emptyArray.push("");
    }
  
    for (let day = 1; day <= daysInMonth; day++) {
      emptyArray.push(trackDay);
      trackDay++;
      if (emptyArray.length === 7) {
        finalArray.push(emptyArray);
        emptyArray = [];
      }
    }
  
    if (emptyArray.length > 0) {
      finalArray.push(emptyArray);
    }
  
    while (finalArray.length < 6) {
      finalArray.push(new Array(7).fill(""));
    }
  
    setDaysOfMonth(finalArray);
  }  
  
  function changeColor(week,day){
    if(daysOfMonth[week][day] == null || daysOfMonth[week][day] === ""){
      return "noDate";
    }else if(currentDate.getMonth() === currentMonth && currentDate.getFullYear() === currentYear && currentDate.getDate() === daysOfMonth[week][day]){
      return "currentDate";
    }else{
      return "date";
    }
  }
  return (
    <div id="calendarBackground">
    <div id="topCalendar">
      <button id="leftArrow" onClick={() => switchMonth(-1)}>&lt;</button>
      <div id="monthText">{months[currentMonth]} ({currentYear})</div>
      <button id="rightArrow" onClick={() => switchMonth(1)}>&gt;</button>
    </div>
    <div id="daysOfWeek">
      <div id="dayName">SUN</div>
      <div id="dayName">MON</div>
      <div id="dayName">TUE</div>
      <div id="dayName">WED</div>
      <div id="dayName">THU</div>
      <div id="dayName">FRI</div>
      <div id="dayName">SAT</div>
    </div>
    {columnArray.map((weekIndex) => (
      <div key={weekIndex} id="bottomCalendar">
        <div id="rowCalendar">
          {rowArray.map((dayIndex) => (
            <button key={dayIndex}  onClick={() => whatDayIsIt(weekIndex, dayIndex)} className={ changeColor(weekIndex, dayIndex)}>{daysOfMonth[weekIndex][dayIndex]}</button>
          ))}
        </div>
      </div>
    ))}

    </div>

  );
}

export default App;
