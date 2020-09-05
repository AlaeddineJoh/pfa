import React ,{useState, useEffect} from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios'

function BarChart(){
    const[confirmed,setConfirmed]=useState()
    const[recovered,setRecovered]=useState()
    const[deaths,setDeaths]=useState()
    const[cd, setcd]= useState("");
    useEffect(()=>{
      axios.get("http://127.0.0.1:5000/")
      .then(response => {setConfirmed(response.data.last_day_values[0].Confirmed)
      setRecovered(response.data.last_day_values[2].Recoverd )
      setDeaths(response.data.last_day_values[1].Deaths)} )
    },[] ) 
    
    const c = () => {
      setcd({
        labels : ['Deaths','Recovered','Confirmed'] ,
        datasets : [{
          label: 'Last day values',
          data: [deaths,recovered,confirmed] ,
          backgroundColor: ['#000000','#2ea3dd','	#F00'],
         
       }]
      })
    }
    useEffect(()=>{
      c()
    },[cd]
    )

    return(
<div style={{width:"80%",marginTop:'5%' , marginLeft:"10%" , marginRight:"5%"}}>        
      <Bar data={cd} options={{
          
          
        }} />
    </div>
    );
}

export default BarChart