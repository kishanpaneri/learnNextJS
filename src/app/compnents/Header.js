"use client";
import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useRouter } from "next/navigation";

function Header() {
  debugger;
  const router = useRouter();
  const [user, setUser] = useState({});
  const userLS = localStorage.getItem("currentUser");
  useEffect(() => {        
    if (userLS && userLS != null) {
      setUser(JSON.parse(userLS));
    }
  }, [userLS]);
  const onClickLogout = () => {
    localStorage.setItem("currentUser", null);
    router.push("/");      
    router.refresh();  
  };
  return user && user?.email ? (
    <Navbar bg="light" expand="lg" className="mb-3">
      <Container>
        <Navbar.Brand href="/">Learn NextJS</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/emicalculator">Emi Calculator</Nav.Link>
            <Nav.Link href="/exchangerates">Exchange Rates</Nav.Link>
          </Nav>
          <Nav>
            <NavDropdown title="Profile" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#">Edit Profile</NavDropdown.Item>
              <NavDropdown.Item href="#">Change Password</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#" onClick={() => onClickLogout()}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  ) : (
    <></>
  );
}

export default Header;
