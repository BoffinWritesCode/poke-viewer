import './genderBar.css';
import React from 'react';

class GenderBar extends React.Component {
    render() {
        const rate = this.props.rate;
        const genderless = rate === -1;
        let back_style = {
            backgroundColor: genderless ? 'transparent' : '#87DDFF'
        }
        let style = {
            backgroundColor: genderless ? 'rgb(70, 70, 70)' : '#FF9EEB',
            width: genderless ? '100%' : `${100 * rate / 8}%`
        };
        return <div className="gender-bar" style={back_style}>
            <div className="gender-bar-inner" style={style}></div>
            <label>{genderless ? 'Genderless' : `${style.width} female`}</label>
        </div>
    }
}

export default GenderBar;