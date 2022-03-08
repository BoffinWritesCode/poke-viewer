import './header.css';
import { FaMoon, FaSun } from 'react-icons/fa'
import ToggleButton from './toggleButton.js';
import React from 'react';

class Header extends React.Component {
    render() {
        const theme = localStorage.getItem('theme');
        return (
            <div className="header">
                <img class="logo" src={require("../img/logo.png")}/>
                <ToggleButton 
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