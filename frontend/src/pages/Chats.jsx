import React, { useEffect } from 'react'
import axios from 'axios';

const Chats = () => {

  async function getData(){
    // const data = await axios.get("http://localhost:3001/api/chats")
    // console.log(data);
  } 

  useEffect(()=>{
    const token = localStorage.getItem('tokentJWT');
    getData(token);
  },[])

  return (
    <div>
      
    </div>
  )
}

export default Chats