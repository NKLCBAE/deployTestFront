import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import Schedule from "./Schedule";
import Calendar from "./Calendar";

function App() {
let today = new Date();   

let yyyy = today.getFullYear(); // 년도
let mm = today.getMonth() + 1;  // 월
if((mm+"").length === 1){
  mm = "0"+mm;
}
let dd = today.getDate();  // 날짜
if((dd+"").length === 1){
  dd = "0"+dd;
}
today = yyyy + '-' + mm + '-' + dd

  return (
      <Routes>
        <Route path="/" element={<Navigate to={`/schedule/${today}`}replace/>} />
        <Route path="/schedule/:date" element={<Schedule/>} />
        <Route path="/calendar/:yyyymm" element={<Calendar/>} />
      </Routes>
  );
}

export default App;