import React ,{useEffect} from 'react';
import {Table} from 'react-bootstrap';
import LineChart from './LineChartComponent';
import PieChart from'./PieChartComponent';
import BarChart from'./BarChartComponent';
import {useParams} from 'react-router-dom';
import axios from 'axios'

function Country(){
    let { name } = useParams()
    useEffect(()=>{
        axios.get(`http://127.0.0.1:5000/${name}/`)
        .then(data => console.log(data))
        .catch(e => console.log(e))
      },[name] ) 
    return(
        
        
        <div className="container">
            <h1 style={{textAlign :"center" ,color:'#2EA3DD',fontStyle:'Italic', marginTop:'4%', marginBottom:'4%', fontSize:'60px'}}> {name} </h1>
            <Table>
                <tr>
                    <th style={{paddingTop:'10%'}}>Total Cases</th>
                    <th><LineChart/></th>
                </tr>
                <tr>
                    <th style={{paddingTop:'10%'}}>Total Death</th>
                    <th><LineChart/></th>
                </tr>
                <tr>
                    <th style={{paddingTop:'10%'}}>Total Recovered</th>
                    <th><LineChart/></th>
                </tr>
            </Table>
            <Table style={{width:'100%'}}>
                <tr>
                    <th> <BarChart/></th>
                    <th style={{paddingTop:'5%'}}><PieChart/></th>
                </tr>
            </Table>
      
        </div>
    );
}

export default Country ;