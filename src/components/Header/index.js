import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { IndexLinkContainer  } from 'react-router-bootstrap';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import './Header.scss';
import { push } from 'connected-react-router';

class Header extends Component {
    logout() {
        this.props.firebase.logout().then(res => {
            this.props.push('/');
        });
    }
    render() {
        const { authUser, location } = this.props;
        
        const loggedInNav = (
            <Nav className="mr-auto">
                <NavItem>
                    <IndexLinkContainer to={ROUTES.DAYS} active={location.pathname === ROUTES.DAYS ? true : false}>
                        <Nav.Link>Progress</Nav.Link>
                    </IndexLinkContainer>
                </NavItem>
                <NavItem onClick={() => this.logout()}><Nav.Link>Logout</Nav.Link></NavItem>
            </Nav>
        )

        const loggedOutNav = (
            <Nav className="mr-auto">
                <IndexLinkContainer to={ROUTES.LOGIN} active={location.pathname === ROUTES.LOGIN ? 1 : 0}>
                    <NavItem>Login</NavItem>
                </IndexLinkContainer>
            </Nav>
        )

        return (
            <Navbar bg="dark" expand="md" variant="dark" className="mb-4" fixed="top">
                <IndexLinkContainer to={ROUTES.HOME} exact>
                    <Navbar.Brand href="#home">It Counts!</Navbar.Brand>
                </IndexLinkContainer>
                <Navbar.Toggle aria-controls="header-dropdown" />
                <Navbar.Collapse id="header-dropdown">
                    {authUser ? loggedInNav : loggedOutNav}
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

const mapStateToProps = state => ({
    authUser: state.authUser
});

export default compose(connect(mapStateToProps, { push }), withRouter, withFirebase)(Header);