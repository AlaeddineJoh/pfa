import React ,{useState, useEffect} from 'react';
import { Line } from 'react-chartjs-2';

function LineChart(){
    const[chartData, setchartData]= useState("");
    const chart = () => {
      setchartData({
        labels : ['2020-01-21','2020-01-21','2020-01-22'] ,
        datasets : [{
          label: 'Confirmed cases over the world',
          data: [555 , 654,941 ],
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
       }]
      })
    }

    useEffect(()=>{
      chart()
    },[]
    )
    
    return(
    <div>
        <div style={{height: '20%' ,width:"70%" , marginLeft:"15%"}}>
              
        <Line data ={chartData } options={{
          responsive : true ,
          title : {text : 'Confirmed cases over the world' ,Display : true },
        }}/>
        
      </div>
      
    </div>);
    
}

export default LineChart;