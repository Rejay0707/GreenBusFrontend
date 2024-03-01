
import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { FaQuestionCircle, FaUser } from 'react-icons/fa';
// import logo from '../assets/green_bus_logo.png'; // Change this to your green bus logo path

const Header = () => {
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" className="justify-content-between">
        {/* Left side of the header */}
        <Navbar.Brand className='nav-link'>
          {/* <img src={logo} alt="Green Bus" height="30" /> */}
          Bus Ticketing
        </Navbar.Brand>

        {/* Right side of the header */}
        <Nav className="ml-auto">
          <Nav.Link href="#" className="nav-link">
            <FaQuestionCircle />
            Help
          </Nav.Link>

          <Nav.Link href="#" className="nav-link">
            <FaUser />
            Account
          </Nav.Link>
        </Nav>
      </Navbar>
    </header>
  );
};

export default Header;



