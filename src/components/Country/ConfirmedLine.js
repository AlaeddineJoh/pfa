import React ,{useState, useEffect} from 'react';
import { Line } from 'react-chartjs-2';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import {Row ,Col } from "react-bootstrap";

function ConfirmedLine(){
  let { name } = useParams()
  const[totalConfirmed,setTotalConfirmed]=useState()
  const[date,setdate]=useState()
  const[Confirmed,setConfirmed]=useState()


  useEffect(()=>{
    axios.get(`http://127.0.0.1:5000/${name}/`)
    .then(response =>{
      setTotalConfirmed(response.data.last_day_values.Confirmed)
      setdate(response.data.Date)
      setConfirmed(response.data.confirmed)
    
    })
  },[name] ) 
 
const[chartData, setchartData]= useState("");
const chart = () => {
  setchartData({
    labels : date ,
    datasets : [{
      label: 'Confirmed cases over the world',
      data: Confirmed,
      backgroundColor: "rgba(75,192,192,0.4)",
      borderColor: "rgba(75,192,192,1)",
      fill : true,
   }]
  })
}

useEffect(()=>{
  chart()
},[chartData])
    
    return(
      <Row style={{marginBottom :'5%',marginTop :'8%'}}>
      <Col xs={12} md={3} style = {{marginTop :"10%"}} >
        <h4 style={{color:'	#2EA3DD', marginLeft :'5%', marginTop :'10%', fontStyle:'Italic',fontFamily:'Gilroy'}} > Total Confirmed : </h4>
        <h2 style ={{margin : "8%"}}> {totalConfirmed} </h2>

      </Col>
      <Col xs={12} md={9}>
      <Line data ={chartData } options={{
        responsive : true ,
        title : {text : 'Confirmed cases over time' ,Display : true },
      }}/>
      </Col>
      
    </Row>
      
    );
    
}

export default ConfirmedLine;