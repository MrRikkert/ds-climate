import React, { Component } from 'react';
import "./Navbar.css"
import { Link } from 'react-router-dom'

class Navbar extends Component {
    state = {
        navbar: ""
    }

    constructor(props) {
        super(props);
        this.nav_burger = React.createRef();
        this.nav_menu = React.createRef();
    }

    toggleNavBar = () => {
        let navbar = this.state.navbar
        this.setState({
            navbar: navbar === "" ? "is-active" : ""
        })
    }

    render() {
        return (
            <nav className="navbar" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <a className="navbar-item">
                        Hallo
                    </a>


                    <a role="button" className={"navbar-burger burger" + this.state.navbar} ref={this.nav_burger} aria-label="menu"
                        aria-expanded="false" data-target="navbarBasicExample" onClick={() => this.toggleNavBar()}>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>

                <div id="cinema-navbar" className={"navbar-menu" + (this.state.navbar)}>
                    <div className="navbar-start">
                        <Link className="navbar-item" to="/treemap">Fuel usage</Link>
                    </div>
                </div >
            </nav >

        );
    }
}

export default Navbar;
