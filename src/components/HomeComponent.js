import React,{  useEffect , useState } from 'react';
import ReactTooltip from "react-tooltip";
import MapChart from "./MapChartComponent";
import {Button,Form,Dropdown} from 'react-bootstrap';
import LineChart from'./LineChartComponent';
import PieChart from'./PieChartComponent';
import axios from 'axios'


function Home() {
  useEffect(()=>{
    axios.get("http://127.0.0.1:5000/")
    .then(data => console.log(data))
    .catch(e => console.log(e))
  },[] ) 
  const [content, setContent] = useState("");

      return (
        <div>
          <br/> 
          <br/>
          <h1 style={{color:'	#2EA3DD', marginLeft :'6%',fontStyle:'Italic'}}> Description</h1>  
          <br/> <br/> 
          
          <h5 style={{ marginLeft :'10%'}}> The coronavirus disease (COVID-19) is an infectious disease caused by a new strain of coronavirus. This new virus and disease were unknown before the outbreak began in Wuhan, China, in December 2019</h5>
          <br/> <br/>
          <p style={{ marginLeft :'30%'}}>This Web site will help you get some stats about this virus since the start of this pandamic . Stay Safe ! </p>
          <br/> 
          <br/> 
          <br/>
          <h1 style={{color:'	#2EA3DD', marginLeft :'10%',fontStyle:'Italic'}}>General stats over the World  : </h1> <br/>
              <LineChart/>
              <div style={{width:"50%" , marginLeft:"25%"}}>
                <PieChart/>
              </div>
          <br/> 
          <br/> 
          <br/>
          <h1 style={{color:'	#2EA3DD', marginLeft :'6%',fontStyle:'Italic'}}> Countries Statistics :</h1> 
          <br/> 
          <br/>
          <div className='container' style={{fontSize: '30px'}}	>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Dropdown Button
            </Dropdown.Toggle>
                
            <Dropdown.Menu>
              <Dropdown.Item href={"/Country/Tunisia"}>Tunisia</Dropdown.Item>
              <Dropdown.Item href={"/Country/Algeria"}>Algeria</Dropdown.Item>
              <Dropdown.Item href={"/Country/Morroco"}>Morroco</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
           </div> 
           <br/> 
          <br/>
            <div className='container'>
              <h1 style={{color:'	#2EA3DD'}}>World Population Map : </h1> <br/>
              <MapChart setTooltipContent={setContent} />
              <ReactTooltip>{content}</ReactTooltip>
          </div>
          <br/> 
          <br/>
          
          <h1 style={{color:'	#2EA3DD', marginLeft :'6%',fontStyle:'Italic'}}> Help us improve ! </h1> 
          <br/> 
          <br/>
          <Form className='container' style={{fontSize: '30px'}}>
              <Form.Row style={{marginLeft: '23%'}}>
                  <Form.Group  md="4" >
                    <Form.Label>First name</Form.Label>
                    <Form.Control
                    required
                    type="text"
                    placeholder="First name"
                    
                     />  
                </Form.Group> 
                <Form.Group  md="4" >
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                    required
                    type="text"
                    placeholder="Last Name"
                    
                     />  
                </Form.Group> 
                <Form.Group  md="4" >
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                    required
                    type="email"
                    placeholder="Email"
                    
                     />  
                </Form.Group>
              </Form.Row>
              <br/> 
          <br/> 
              <Form.Group  md="6" >
                <Form.Label>Suggested improvements :</Form.Label>
                <Form.Control type="text" placeholder="" required />
                <Form.Control.Feedback type="invalid">
                  Please provide us with your improvements :
                </Form.Control.Feedback>
              </Form.Group>
          <Button type="submit" style={{marginLeft: '40%'}}>Submit </Button> 
        </Form>
        </div>   
    
   
        
      );
    }

    export default Home ;