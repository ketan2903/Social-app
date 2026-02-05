import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { logout } from "../Services/auth";

function TopNav() {
  return (
    <>
     
      <Navbar
        bg="light"
        fixed="bottom"
        className="border-top shadow-sm"
      >
        <Container className="justify-content-around text-center">
          
          <Nav>
            <Nav.Link as={Link} to="/feed">
              <i className="bi bi-house fs-4"></i>
            </Nav.Link>
          </Nav>

          <Nav>
            <Nav.Link as={Link} to="/create">
              <i className="bi bi-plus-circle fs-4"></i>
            </Nav.Link>
          </Nav>

          <Nav>
            <Nav.Link onClick={logout}>
              <i className="bi bi-box-arrow-right fs-4 text-danger"></i>
            </Nav.Link>
          </Nav>

        </Container>
      </Navbar>
    </>
  );
}

export default TopNav;
