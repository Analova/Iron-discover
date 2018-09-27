import React, { Component } from 'react';
import api from '../../api';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  Container,
  NavbarBrand,
} from 'reactstrap';
import { NavLink, Link } from 'react-router-dom'


export default class IronNavbar extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  handleLogoutClick(e) {
    api.logout()
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <Navbar className="IronNavbar" color="primary" dark expand="sm">
        <Container>
          <NavbarBrand tag={Link} to="/">Discover</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                {api.isLoggedIn() && <NavLink className={"nav-link"} to="/add-activity">Add activity</NavLink>}
              </NavItem>
              <NavItem>
                {!api.isLoggedIn() && <NavLink className={"nav-link"} to="/signup">Signup</NavLink>}
              </NavItem>
              <NavItem>
                {!api.isLoggedIn() && <NavLink className={"nav-link"} to="/login">Login</NavLink>}
              </NavItem>
              <NavItem>
                {api.isLoggedIn() && <NavLink className={"nav-link"} to="/" onClick={(e) => this.handleLogoutClick(e)}>Logout</NavLink>}
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    );

  }
}
