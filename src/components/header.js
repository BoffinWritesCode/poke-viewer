import './header.css';
import { FaMoon, FaSun, FaBars } from 'react-icons/fa'
import ToggleButton from './toggleButton.js';
import React from 'react';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.displayRef = props.displayRef;
    }
    render() {
        const theme = localStorage.getItem('theme');
        return (
            <div className="header">
                <img className="logo" src={require("../img/logo.png")}/>
                <ToggleButton
                    mobileOnly={true}
                    tooltip="Show List"
                    offIcon={<FaBars size={26}/>} 
                    onIcon={<FaBars size={26}/>} 
                    toggleFunction={(activated) => {
                        if (this.props.displayRef.current) {
                            this.props.displayRef.current.toggleList();
                        }
                    }}
                    activated={false}
                />
                <ToggleButton 
                    mobileOnly={false}
                    tooltip="Change Theme"
                    offIcon={<FaSun size={26}/>} 
                    onIcon={<FaMoon size={26}/>} 
                    toggleFunction={(activated) => {
                        if (activated) document.body.classList.add("light-theme");
                        else document.body.classList.remove("light-theme");
                        localStorage.setItem('theme', activated ? "light" : "dark");
                    }}
                    activated={theme === "light"}
                />
            </div>
        );
    }
}

export default Header;