import './toggleButton.css';
import React from 'react';

class ToggleButton extends React.Component {
    constructor(props) {
        super(props);
        // state contains whether the button is activated and the icon
        this.state = {
            acivated: false,
            icon: props.onIcon
        };
        // some extra data to store
        this.toggleFunction = props.toggleFunction;
        this.onIcon = props.onIcon;
        this.offIcon = props.offIcon;
        // bind the toggle function so "this" is recognised
        this.toggle = this.toggle.bind(this);
    }
    toggle() {
        // set the state, then once it's changed, call the toggle function
        this.setState({
            activated: !this.state.activated,
            icon: !this.state.activated ? this.offIcon : this.onIcon
        }, () => {
            this.toggleFunction(this.state.activated);
        });
    }
    render() {
        return (<div className='toggle-button' onClick={this.toggle}>
            {this.state.icon}
        </div>);
    }
}

export default ToggleButton;