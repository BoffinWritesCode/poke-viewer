import './navbar.css';
import { FaMoon, FaSun } from 'react-icons/fa'
import ToggleButton from './toggleButton';

function NavBar() {
  return (
    <div className="navigation-bar">
        <ToggleButton 
            offIcon={<FaSun size={26}/>} 
            onIcon={<FaMoon size={26}/>} 
            toggleFunction={(activated) => {
                if (activated) document.body.classList.add("light-theme");
                else document.body.classList.remove("light-theme");
            }}
        />
    </div>
  );
}

export default NavBar;