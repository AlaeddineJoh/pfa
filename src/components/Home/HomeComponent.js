import React,{  useEffect , useState } from 'react';
import ReactTooltip from "react-tooltip";
import MapChart from "./MapChartComponent";
import {Button,Form,Container} from 'react-bootstrap';
import LineChart from'./LineChartComponent';
import BarChart from'./BarChartComponent';
import axios from 'axios';
import {Select} from "evergreen-ui";
import {useHistory} from 'react-router-dom';


function Home() {
  const [countryName,setcountryName]=useState([])
  let history = useHistory();


  useEffect(()=>{
    axios.get("http://127.0.0.1:5000/")
    .then(response => setcountryName(response.data.Country_list))
    .catch(e => console.log(e))
  },[] ) 

  const [content, setContent] = useState("");
  const handle=(event)=>{
    history.push("/Country/"+event)

  } 
    

      return (
        <div >
          <br/> 
          <br/>
          <h1 style={{color:'	#2EA3DD', marginLeft :'6%',marginTop :'3%',fontStyle:'Italic',fontFamily:'Gilroy'}}> Description</h1>  

          
          <h5 style={{ marginLeft :'10%',fontFamily:'Gilroy'}}> The coronavirus disease (COVID-19) is an infectious disease caused by a new strain of coronavirus. This new virus and disease were unknown before the outbreak began in Wuhan, China, in December 2019</h5>
         
          <p style={{ textAlign :'center',fontFamily:'Gilroy'}}>This Web site will help you get some stats about this virus since the start of this pandamic . Stay Safe ! </p>
          
          <h1 style={{color:'	#2EA3DD', marginLeft :'10%',fontStyle:'Italic' , margin:"5%",fontFamily:'Gilroy'}}>General stats over the World  : </h1> 
              <LineChart/>
                <BarChart/>
          <br/> 
          <br/> 
          <br/>
          <h1 style={{color:'	#2EA3DD', marginLeft :'6%',fontStyle:'Italic',fontFamily:'Gilroy'}}> Countries Statistics :</h1> 
          <br/> 
          <br/>
          <div className='container' style={{fontSize: '30px'}}	>
         
                
          <Select id='country' width="100%" height={60} onChange={event => handle(event.target.value)}>
               <option>select a country </option>
              {countryName.map((country) => <option value={country}>{country}</option>)}
          </Select>
          
        
           </div> 
           <br/> 
          <br/>
            <div className='container'>
              <h1 style={{color:'	#2EA3DD',fontFamily:'Gilroy'}}>World Population Map : </h1> <br/>
              <MapChart setTooltipContent={setContent} />
              <ReactTooltip>{content}</ReactTooltip>
          </div>
          <br/> 
          <br/>
          
          <h1 style={{color:'	#2EA3DD', marginLeft :'6%',fontStyle:'Italic',fontFamily:'Gilroy'}}> Help us improve ! </h1> 
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