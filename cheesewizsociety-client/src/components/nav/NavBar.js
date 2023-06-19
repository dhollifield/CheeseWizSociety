import React, { navigate, useState, useEffect } from 'react';
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
import "./NavBar.css"
import { useNavigate } from 'react-router-dom';

function NavBar(args)  {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const navigate = useNavigate();
  const onLogout = () => {
    logout.logout(navigate("/login"));
  };

  const currentUser = localStorage.getItem("user")
  const cheeseUserObject = JSON.parse(currentUser)

  console.warn(cheeseUserObject)

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
                <DropdownItem href="/">Home</DropdownItem>
                <DropdownItem href="/posts/">Posts</DropdownItem>
                <DropdownItem href="/recipes/">Recipes</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
            <img 
              className="navbar-profile-image"
              alt="user-image"
              src={cheeseUserObject.ImageUrl}/>
          <button type="submit" onClick={onLogout}>
            Logout
          </button>
        </Collapse>
      </Navbar>
    </>
  );
}

export default NavBar;