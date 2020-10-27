import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem, Container } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { IndexLinkContainer } from 'react-router-bootstrap';
import { withFirebase } from '../Firebase';
import * as ROUTES from 'constants/routes';
import './Header.scss';
import logo from 'assets/img/logo.png';
import { push } from 'connected-react-router';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeClass: 'top'
        }
    }

    componentDidMount() {
        this.onScroll = this.onScroll.bind(this);

        window.addEventListener('scroll', this.onScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll);
    }

    onScroll() {
        let activeClass = 'normal';
        if (window.scrollY === 0) {
            activeClass = 'top';
        }
        this.setState({ activeClass });
    }

    logout() {
        this.props.firebase.logout().then(res => {
            this.props.push('/');
        });
    }

    login() {
        this.props.firebase.login().then(() => {
            this.props.push('/days');
        });
    }

    render() {
        const { authUser, location } = this.props;
        let { activeClass } = this.state;
        activeClass = location.pathname === ROUTES.HOME ? activeClass : activeClass;

        const loggedInNav = (
            <Nav>
                <NavItem>
                    <IndexLinkContainer to={ROUTES.DAYS} active={location.pathname === ROUTES.DAYS ? true : false}>
                        <Nav.Link>Progress</Nav.Link>
                    </IndexLinkContainer>
                </NavItem>
                <NavItem onClick={() => this.logout()}><Nav.Link>Logout</Nav.Link></NavItem>
            </Nav>
        )

        const loggedOutNav = (
            <Nav>
                <NavItem>
                    <Nav.Link onClick={this.login.bind(this)}>Login</Nav.Link>
                </NavItem>
            </Nav>
        )

        return (
            <Container>
                <Navbar bg="dark" expand="md" variant="dark" className={activeClass} fixed="top" collapseOnSelect={true}>
                    <IndexLinkContainer to={ROUTES.HOME} exact>
                        <Navbar.Brand href="#home"><img src={logo} alt="logo" /></Navbar.Brand>
                    </IndexLinkContainer>
                    <Navbar.Toggle aria-controls="header-dropdown" />
                    <Navbar.Collapse id="header-dropdown" className="justify-content-end">
                        {authUser ? loggedInNav : loggedOutNav}
                    </Navbar.Collapse>
                </Navbar>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    authUser: state.authUser
});

export default compose(connect(mapStateToProps, { push }), withRouter, withFirebase)(Header);