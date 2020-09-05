import React ,{useState, useEffect} from 'react';
import { Pie } from 'react-chartjs-2';
import { useParams} from 'react-router-dom';
import axios from 'axios';


function PieChart(){
  let { name } = useParams()
    const[death,setDeath]=useState()
    const[actif,setActif]=useState()
    const[recovered,setRecovered]=useState()

    useEffect(()=>{
        axios.get(`http://127.0.0.1:5000/${name}/`)
        .then(response =>{setDeath(response.data.last_day_values.pourcenttage_of_deaths) 
                        setActif(response.data.last_day_values.pourcenttage_of_active_cases) 
                        setRecovered(response.data.last_day_values.pourcenttage_of_recovered)} )

      },[name] ) 
    const[cd, setcd]= useState({});
    const c = () => {
      setcd({
        labels : ['Deaths %','Actif cases %','Recovered population %'] ,
        datasets : [{
          title : 'PieChart displaying the state of the cases',
          data: [death,actif,recovered], 
          backgroundColor: ['#000000','#F00','#2ea3dd'],
          borderColor: "rgba(75,192,192,0.1)",
       }]
      })
    }
    useEffect(()=>{
      c()
    },
    )

    return(
    <div style={{width:700}}>
        <Pie  data={cd} options={{
          responsive : true ,
          
          
        }} />
    </div>
    );
}

export default PieChart;