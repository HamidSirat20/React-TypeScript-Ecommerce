import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import logo from "../../assets/logo.jpg";

const NavBar = () => {
  return (
    <Navbar
      expand="xl"
      bg="warning"
      variant="Warning"
      fixed="top"
      className="shadow-sm">
      <Container fluid>
        <Navbar.Brand href="/">
          <img
            alt="Logo"
            src={logo}
            width="60"
            height="40"
            className="d-inline-block align-top me-2"
          />
          E-Commerce
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <NavDropdown title="More Tools" id="basic-nav-dropdown">
              <NavDropdown.Item href="/products/add">
                Add Product
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
