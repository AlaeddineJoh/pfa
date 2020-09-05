import React ,{useState, useEffect} from 'react';
import { Pie } from 'react-chartjs-2';

function PieChart(){
    const[cd, setcd]= useState("");
    const c = () => {
      setcd({
        labels : ['Recovered','Deaths'] ,
        datasets : [{
          label: 'Confirmed cases over the world',
          data: [11356275 , 708424 ], 
          backgroundColor: ['#3CB043','#D0312D'],
          borderColor: "rgba(75,192,192,1)",
       }]
      })
    }
    useEffect(()=>{
      c()
    },[]
    )

    return(
    <div>
        <Pie data={cd} options={{
          responsive : true ,
          
        }} />
    </div>
    );
}

export default PieChart