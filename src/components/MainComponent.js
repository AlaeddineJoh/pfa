import React from 'react';
import Home from './Home/HomeComponent';
import Header from './HeaderComponent';
import Country from './Country/CountryComponent';
import {Switch , Route , Redirect} from 'react-router-dom';



function Main(){
  return (
    <div>
      <Header/>
      <Switch>
        <Route path="/Home" component={() =><Home/>}/>
        <Route path="/Country/:name" component={()=> <Country/>}/>
        <Redirect to="/Home"/>
      </Switch>
    </div>
  );
}

export default Main ;



