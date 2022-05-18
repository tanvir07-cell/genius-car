import { signOut } from "firebase/auth";
import React from "react";

import {
  Button,
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
  Offcanvas,
} from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import DarkMode from "../../../DarkMode/DarkMode";
import auth from "../../../Firebase/firebase.init";
import logo from "../../../images/images/logo.png";

const Header = () => {
  const [user] = useAuthState(auth);
  console.log(user);
  return (
    <>
      {[false].map((expand) => (
        <Navbar
          key={expand}
          bg="primary"
          expand={expand}
          className="mb-3"
          sticky="top"
        >
          <Container fluid>
            <Navbar.Brand as={Link} to="/">
              <img src={logo} alt="" height="30" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton className="bg-primary">
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  <img src={logo} alt="" height="30" />
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link as={Link} to="/">
                    Home
                  </Nav.Link>
                  <Nav.Link href="home#services">Services</Nav.Link>
                  <Nav.Link href="home#experts">Experts</Nav.Link>

                  {user ? (
                    <div>
                      <button
                        className="btn btn-danger w-50 mb-5 mt-5"
                        onClick={() => signOut(auth)}
                      >
                        SignOut
                      </button>
                      {user?.displayName ? (
                        <span className="text-success mx-2">
                          {user?.displayName}
                        </span>
                      ) : (
                        <span className="text-success mx-2">{user?.email}</span>
                      )}
                    </div>
                  ) : (
                    <Nav.Link as={Link} to="/login">
                      Login
                    </Nav.Link>
                  )}

                  <DarkMode></DarkMode>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
};

export default Header;
