import React ,{useState, useEffect} from 'react';
import { Line } from 'react-chartjs-2';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import {Row ,Col } from "react-bootstrap";


function LineChart(){
  let { name } = useParams()
  const[totaldeaths,settotaldeaths]=useState()
  const[date,setdate]=useState()
  const[deaths,setdeaths]=useState()


  useEffect(()=>{
    axios.get(`http://127.0.0.1:5000/${name}/`)
    .then(response =>{
      settotaldeaths(response.data.last_day_values.Deaths)
      setdate(response.data.Date)
      setdeaths(response.data.Deaths)
    
    })
  },[name] ) 
 
const[chartData, setchartData]= useState("");
const chart = () => {
  setchartData({
    labels : date ,
    datasets : [{
      label: 'Confirmed cases over the world',
      data: deaths,
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
      <Col xs={12} md={3} style = {{marginTop :"10%"}}  >
        <h3 style={{color:'	#2EA3DD', marginLeft :'5%', marginTop :'10%', fontStyle:'Italic',fontFamily:'Gilroy'}} >Total Deaths  : </h3>
        <h2 style ={{margin : "8%"}}> {totaldeaths} </h2>

      </Col>
      <Col xs={12} md={9}>
      <Line data ={chartData } options={{
        responsive : true ,
        title : {text : 'deaths over time' ,Display : true },
      }}/>
      </Col>
      
    </Row>
      
      
   );
    
}

export default LineChart;