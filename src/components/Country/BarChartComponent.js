import React ,{useState, useEffect} from 'react';
import { Bar } from 'react-chartjs-2';
import { useParams} from 'react-router-dom';
import axios from 'axios';


function BarChart(){
  let { name } = useParams()
  const [confirmed ,setconfirmed]=useState()
  const [population ,setpopulation]=useState()

    useEffect(()=>{
        axios.get(`http://127.0.0.1:5000/${name}/`)
        .then(response =>{
           setconfirmed(response.data.last_day_values.Confirmed)
            setpopulation(response.data.last_day_values.population)})

      },[name] ) 
    const[cd, setcd]= useState({});
    const c = () => {
      setcd({
        labels : ['population','confirmed'] ,
        datasets : [{
          label: ['Total pupulation'],
          data: [population , confirmed ], 
          backgroundColor: ['#2ea3dd','#F00'],
          borderColor: "rgba(75,192,192,0.1)",
       }]
      })
    }
    useEffect(()=>{
      c()
    },[cd]
    )

    return(
    <div style={{width:700}}>
        <Bar data={cd} options={{
          responsive : true ,
          
          
        }} />
    </div>
    );
}

export default BarChart;