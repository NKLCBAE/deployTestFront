import  React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios"

export default function Calendar() {
  const [schedules, setSchedules] = useState();
  const { date } = useParams();
  // useEffect(() => {
  //   async function getSchedules() {
  //     const response = await axios.get(`/api/schedules/${date}`);
  //     console.log(response);
  //     const data = response.data;

  //     setSchedules(data);
  //   }

  //   getSchedules();
  // }, []);

  return (
    <div>
      <h1>hello</h1>
    </div>
  )
}