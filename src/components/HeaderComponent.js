import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';

function Header(){
    return (
      <div>
       
      <Navbar fixed='top' collapseOnSelect expand="lg" bg="dark" variant="dark">
              <Navbar.Brand href="/Home">Data Visualisation COVID-19</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#MapChart">WorldWide Stats</Nav.Link>
            <Nav.Link href="/">Countries</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="/Home">Help us improve</Nav.Link>
            
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      </div>);
      }
export default Header ;