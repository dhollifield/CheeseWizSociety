import React, { navigate, useState } from 'react';
import { logout } from '../helpers/logout';
import logoNoBackground from "./logoNoBackground.png";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from 'reactstrap';

function NavBar(args)  {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const onLogout = () => {
    logout.logout(navigate);
  };

  return (
    <>
      <Navbar {...args}
        className="my-2"
        color="dark"
        dark
        expand="sm"
      >
        <NavbarBrand href="/">
            <img 
                alt="logo"
                src={logoNoBackground}
                style={{
                    height: 80,
                    width: 80
                }}
            />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink href="/">Home</NavLink>
            </NavItem>
            <NavItem>
            <NavLink href="/posts/">Posts</NavLink>
            </NavItem>
            <NavItem>
            <NavLink href="/recipes/">Recipes</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem>Home</DropdownItem>
                <DropdownItem>Posts</DropdownItem>
                <DropdownItem>Recipes</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Reset</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <NavbarText>A Society for Cheese Lovers</NavbarText>
          <button type="submit" onClick={onLogout}>
            Logout
          </button>
        </Collapse>
      </Navbar>
    </>
  );
}

export default NavBar;