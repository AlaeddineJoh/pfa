import React  from 'react';
import {Container,Row,Col} from 'react-bootstrap';
import RecoveredLine from './RecoveredLine';
import BarChart from'./BarChartComponent';
import {useParams} from 'react-router-dom';
import ConfirmedLine from './ConfirmedLine';
import DeathsLine from './DeathsLine';
import PieChart from './PieChart' ;

function Country(){
    let {name} =useParams()
    return(
        
        
        <div style={{margin:'5%'}}>
            <h1 style={{fontFamily:'Gilroy',textAlign :"center" ,color:'#2EA3DD',fontStyle:'Italic', marginTop:'8%', marginBottom:'5%', fontSize:'60px'}}> {name }</h1>
                   
                    
                    <ConfirmedLine/>
                    <RecoveredLine/>
                    <DeathsLine/>
               

            <Row style={{marginTop:'10%'}}>
                
               <Col><h4 style={{fontFamily:'Gilroy',fontSize:'s',textAlign:'center',marginBottom:'7%'}}> Rates of Active and Closed Cases</h4> <PieChart/></Col>
               <Col> <h4 style={{fontFamily:'Gilroy',fontSize:'s',textAlign:'center',marginBottom:'7%'}}> Total Population Vs Confirmed Cases</h4> <BarChart/></Col>
           </Row>
      
        </div>
    );
}

export default Country ;