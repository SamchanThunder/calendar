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
  const [hideWeek5, setHideWeek5] = useState(true);

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
    if(x === 0){
      if(currentMonth === 0 && daysOfMonth[x][y] > 7){
        alert("That is " + months[11] + " " + daysOfMonth[x][y] + ", " + (parseInt(currentYear) - 1));  
      }else if(daysOfMonth[x][y] > 7){
        alert("That is " + months[currentMonth - 1] + " " + daysOfMonth[x][y] + ", " + currentYear);  
      }else{
        alert("That is " + months[currentMonth] + " " + daysOfMonth[x][y] + ", " + currentYear);  
      }
    }else if(x >= 4){
      if(currentMonth === 11 && daysOfMonth[x][y] < 8){
        alert("That is " + months[0] + " " + daysOfMonth[x][y] + ", " + (parseInt(currentYear) + 1));  
      }else if(daysOfMonth[x][y] < 8){
        alert("That is " + months[currentMonth + 1] + " " + daysOfMonth[x][y] + ", " + currentYear);  
      }else{
        alert("That is " + months[currentMonth] + " " + daysOfMonth[x][y] + ", " + currentYear);  
      }
    }else{
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
    
    let daysInLastMonth = new Date(currentYear, currentMonth, 0).getDate() - firstDay + 1;
    for (let i = 0; i < firstDay; i++) {
      emptyArray.push(daysInLastMonth);
      daysInLastMonth += 1;
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

    let empty = true;
    for (var x of finalArray[5]) {
      if (x > 9) {
        empty = false;
        break;
      }
    }
    setHideWeek5(empty);

    let iterate = 1;
    if(empty === true){
      for(let x = 0; x < 7; x++){
        if(!finalArray[4][x]){
          finalArray[4][x] = iterate;
          iterate += 1;
        }
      }
    }else{
      for(let x = 0; x < 7; x++){
        if(!finalArray[5][x]){
          finalArray[5][x] = iterate;
          iterate += 1;
        }
      }
    }
    setDaysOfMonth(finalArray);
  }  
  
  function changeColor(week,day){
    let tempDate = new Date(currentYear, currentMonth, 1);
    let firstDay = tempDate.getDay();

    for(let x = 0; x < firstDay; x++){
      if(week === 0 && day === x){
        return "noDate";
      }
    }
    if(hideWeek5 === true && week === 4){
      if(daysOfMonth[4][day] < 8){
        return "noDate";
      }
    }else if(hideWeek5 === false && week === 5){
      if(daysOfMonth[5][day] < 8){
        return "noDate";
      }
    }
    
    if(currentDate.getMonth() === currentMonth && currentDate.getFullYear() === currentYear && currentDate.getDate() === daysOfMonth[week][day]){
      return "currentDate";
    }

    return "date";
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
    !hideWeek5 || weekIndex !== 5 ? (
      <div key={weekIndex} id="bottomCalendar">
        <div id="rowCalendar">
          {rowArray.map((dayIndex) => {
            const buttonClassName = changeColor(weekIndex, dayIndex);
            const buttonStyle = {
              height: hideWeek5 ? "94px" : "78px", 
            };
            return (
              <button
                key={dayIndex}
                onClick={() => whatDayIsIt(weekIndex, dayIndex)}
                className={buttonClassName}
                style={buttonStyle}
              >
                {daysOfMonth[weekIndex][dayIndex]}
              </button>
            );
          })}
        </div>
      </div>
    ) : null
  ))}
</div>
)}
export default App;