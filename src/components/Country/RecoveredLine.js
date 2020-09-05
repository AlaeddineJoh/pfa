import React ,{useState, useEffect} from 'react';
import { Line } from 'react-chartjs-2';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import {Row ,Col } from "react-bootstrap";

function RecoveredLine(){
  let { name } = useParams()
  const[totalRecovered,settotalrecovered]=useState()
  const[date,setdate]=useState()
  const[recovered,setrecovered]=useState()


    useEffect(()=>{
        axios.get(`http://127.0.0.1:5000/${name}/`)
        .then(response =>{
          settotalrecovered(response.data.last_day_values.Recovered)
          setdate(response.data.Date)
          setrecovered(response.data.recovered)
        
        })
      },[name] ) 
     
    const[chartData, setchartData]= useState("");
    const chart = () => {
      setchartData({
        labels : date ,
        datasets : [{
          label: 'Recovered Cases over time',
          data: recovered,
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
        <h3 style={{color:'	#2EA3DD', marginLeft :'5%', marginTop :'10%', fontStyle:'Italic',fontFamily:'Gilroy'}} > Total Recovered : </h3>
    <h2 style ={{margin : "8%"}}>{totalRecovered}</h2>

      </Col>
      <Col xs={12} md={9}>
      <Line data ={chartData } options={{
        responsive : true ,
        title : {text : 'Confirmed cases over the world' ,Display : true },
      }}/>
      </Col>
      
    </Row>
      
  
            
      
    
  );
  
    
}

export default RecoveredLine;