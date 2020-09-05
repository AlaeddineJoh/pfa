import React ,{useState, useEffect} from 'react';
import { Line } from 'react-chartjs-2';
import {useParams} from 'react-router-dom';
import axios from 'axios';

function LineChart(){
  const [date,setDate]=useState();
  const [rate,setRate]=useState()
  let { name } = useParams()
    useEffect(()=>{
        axios.get("http://127.0.0.1:5000/")
        .then(response => {setDate(response.data.date)
        setRate(response.data.IncreaseRate )} )  
      },[] ) 
    const[chartData, setchartData]= useState("");
    const chart = () => {
      setchartData({
        labels : date ,
        datasets : [{
          label: 'Total increas rate over the world',
          data: rate,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          fill : false,
       }]
      })
    }

    useEffect(()=>{
      chart()
    },[chartData]
    )
    
    return(
<div style={{width:"85%",marginTop:'5%' , marginLeft:"15%",marginLeft:"10%"}}>        
        <Line  data ={chartData } options={{
          responsive : true ,
          title : {text : 'Confirmed cases over the world' ,Display : true },
        }}/>
        
      
        </div> );
    
}

export default LineChart;