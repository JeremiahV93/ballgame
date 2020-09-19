import React from 'react';
import PropTypes from 'prop-types';
import { NavLink as RRNavLink } from 'react-router-dom';
import {
  Collapse,
  NavbarToggler,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

import userData from '../../../helpers/data/userData';
import authData from '../../../helpers/data/authData';

import Auth from './Auth';
import LogOut from './Logout';

class MyNavbar extends React.Component {
  static propTypes = {
    authed: PropTypes.bool,
  }

  state = {
    isOpen: false,
    color: '#005A9C',
  }

  toggle = () => {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  }

  componentDidUpdate() {
    if (authData.getUid()) {
      userData.getUserData(authData.getUid())
        .then((currentUser) => {
          if (currentUser.secondColor) {
            this.setState({ color: currentUser.secondColor });
          }
        })
        .catch((err) => console.error(err));
    }
  }

  render() {
    const { isOpen, color } = this.state;
    const { authed } = this.props;

    const buildNavBar = () => {
      if (authed) {
        return (
          <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink tag={RRNavLink} to='/home'>Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={RRNavLink} to='/past-events'>Past Events</NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={RRNavLink} to='/form'>New Game</NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={RRNavLink} to='/user'>User Settings</NavLink>
          </NavItem>
          <NavItem>
            <LogOut/>
          </NavItem>
        </Nav>
        );
      }
      return (
        <Nav>
            <NavItem>
              <Auth/>
            </NavItem>
          </Nav>
      );
    };

    return (
      <div >
        <Navbar color="light" light expand="md" style= {{
          borderBottom: `5px ${color} solid `,
        }}>
          <NavbarBrand href="/">Ballgame</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={isOpen} navbar>
            {buildNavBar()}
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default MyNavbar;
