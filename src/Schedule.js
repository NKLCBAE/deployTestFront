import  React, { useEffect, useState, useRef } from "react"
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import styled from "styled-components";

export default function Schedule() {
  const [schedules, setSchedules] = useState();
  const [todos, setTodos] = useState([]);

  const { date } = useParams();
  const navigate = useNavigate();
  
  let index = 0;

  const toCalendar = () =>{
    let yyyymm =  new Date(date);
    let yyyy = yyyymm.getFullYear(); // 년도
    let mm = yyyymm.getMonth() + 1;  // 월
    if((mm+"").length === 1){
      mm = "0"+mm;
    }
    yyyymm = yyyy + '-' + mm
    navigate(`/calendar/${yyyymm}`);  
  }

  const prevDate = () => {
    let newDate = new Date(date);
    newDate.setDate(newDate.getDate() - 1);
    let yyyy = newDate.getFullYear(); // 년도
    let mm = newDate.getMonth() + 1;  // 월
    if((mm+"").length === 1){
      mm = "0"+mm;
    }
    let dd = newDate.getDate();  // 날짜
    if((dd+"").length === 1){
      dd = "0"+dd;
    }
    newDate = yyyy + '-' + mm + '-' + dd
    navigate(`/schedule/${newDate}`);   
  }
  
  const nextDate = () => {
    let newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 1);
    let yyyy = newDate.getFullYear(); // 년도
    let mm = newDate.getMonth() + 1;  // 월
    if((mm+"").length === 1){
      mm = "0"+mm;
    }
    let dd = newDate.getDate();  // 날짜
    if((dd+"").length === 1){
      dd = "0"+dd;
    }
    newDate = yyyy + '-' + mm + '-' + dd
    navigate(`/schedule/${newDate}`);   
  }

  async function toggleDone(e) {
    if(e.target.parentElement.children[1].innerText=='완료'){
      return;
    }
    let sIndex = e.target.parentElement.id
    let data = { sIndex: Number(sIndex), done: 0};
    if(e.target.id==0){
      data.done = 1; 
    }
    else{
      data.done = 0; 
    }
    const response = await axios.post(`/api/schedules/toggle`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    getSchedules(date); 
  }

  async function createSchedules() {
    let data = { date: date };  
    const response = await axios.post(`/api/schedules`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    getSchedules(date); 
  }

  const contentsChange = (e) => {
    console.log(e.target.value);
    let id = e.target.parentElement.parentElement.id;
    let copy = [...schedules];
    copy[id].todo = e.target.value;
    setSchedules(copy);
  }

  async function updateSchedules (e) {
    let key = e.target.parentElement.parentElement.id;
    let sIndex = e.target.parentElement.id;

    if(e.target.innerText=="수정"){
      console.log(e.target.parentElement.children[0].readOnly)
      e.target.parentElement.children[0].readOnly = false;
      e.target.innerText = "완료"
    }
    else if(e.target.innerText=="완료"){
      console.log(e.target.parentElement.children[0].readOnly)
      e.target.parentElement.children[0].readOnly = true;
      e.target.innerText = "수정"
      let data = { sIndex : Number(sIndex), todo : schedules[key].todo };  
      const response = await axios.post(`/api/schedules/update`, data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      getSchedules(date); 
    }
  }  

  async function getSchedules(param) {
    const response = await axios.get(`/api/schedules/${param}`);
    console.log(response.data);
    const data = response.data;
    setSchedules(data);
  }

  async function deleteSchedules(e) {
    let sIndex = e.target.parentElement.id

    const response = await axios.delete(`/api/schedules/${sIndex}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    getSchedules(date); 
  }

  useEffect(() => {
    getSchedules(date); 
  }, [date]);

  return (
    <div>
          <StyledButton onClick={toCalendar}>Back</StyledButton>
            <Title>
              <StyledButton ud={"0"} lr={"30"} onClick={prevDate}>◀</StyledButton>
              <HeadText> {date}</HeadText>
              <StyledButton ud={"0"} lr={"30"} onClick={nextDate}>▶</StyledButton>
              <StyledButton ud={"0"} lr={"0"} onClick={createSchedules}>+</StyledButton>
            </Title>
      {
        schedules ? schedules.map((schedules) =>
          <div id={index++}>
            <ToDo id={schedules.sindex}>
              {
                schedules.done === 0?
                  <ToDoContents onClick={toggleDone} id={schedules.done} value={schedules.todo} onChange={contentsChange} readOnly></ToDoContents>
                  :
                  <DoneContents onClick={toggleDone} id={schedules.done} value={schedules.todo} onChange={contentsChange} readOnly></DoneContents>
              }
              {
                schedules.done === 0?
                  <button onClick={updateSchedules}>수정</button>
                  : null
              }
                  <button onClick={deleteSchedules}>삭제</button>
            </ToDo>
          </div>
        ) : null
      }
    </div>
    
  )
}

const StyledButton = styled.button
`
  padding: 10px;
  margin: ${(props) => props.ud+"px "+props.lr+"px" || "0px"};
  border-radius: 8px;
  font-size: 15px;
  border: 1px solid ;
  background: white;
`;

const HeadText = styled.div
`
  display: flex;
  justify-content: center;
  font-weight: bold;
  font-size: 30px;
`;

const Title = styled.div
`
  display: flex;
  justify-content: center;
`;

const ToDo = styled.div
`
  margin-top: 10px;
  display: flex;
  justify-content: center;
`;

const ToDoContents = styled.input
`
  font-size: 20pt;
  color: black;
  border: none;
`;

const DoneContents = styled.input
`
  font-size: 20pt;
  text-decoration: line-through;
  color: gray;
  border: none;
`;