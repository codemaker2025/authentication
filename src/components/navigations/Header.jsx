import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useIntl } from "react-intl";
import { useAtom } from "jotai";
import { localeAtom } from "../../atoms/localeAtom";

export default function Header() {
  const { onLogout, loading, token } = useAuth();
  const { formatMessage } = useIntl();
  const [locale, setLocale] = useAtom(localeAtom);
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      {/* <h2>{formatMessage({ id: 'welcome' })}</h2> */}
      <button onClick={() => setLocale("en")}>🇺🇸 English</button>
      <button onClick={() => setLocale("fr")}>🇫🇷 French</button>
      <Container>
        <Navbar.Brand as={Link} to="/">
          Employee Portal
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/home">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/dashboard">
              Dashboard
            </Nav.Link>
            <Nav.Link as={Link} to="/contactform">
              Contact Form
            </Nav.Link>
            <Nav.Link as={Link} to="/language">
              Language
            </Nav.Link>
            <Nav.Link as={Link} to="/pagination">
              Pagination
            </Nav.Link>
            {token && (
              <Button
                variant="danger"
                onClick={!loading ? onLogout : undefined}
                disabled={loading}
              >
                {loading ? "Logging out..." : "Logout"}
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
