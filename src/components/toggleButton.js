import './toggleButton.css';
import React from 'react';

class ToggleButton extends React.Component {
    constructor(props) {
        super(props);
        // some extra data to store
        this.tooltip = props.tooltip;
        this.toggleFunction = props.toggleFunction;
        this.onIcon = props.onIcon;
        this.offIcon = props.offIcon;
        // state contains whether the button is activated and the icon
        const activated = props.activated ?? false;
        this.state = {
            activated: activated,
            icon: activated ? this.offIcon : this.onIcon
        };
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
        return (<div title={this.tooltip} className='toggle-button' onClick={this.toggle}>
            {this.state.icon}
        </div>);
    }
}

export default ToggleButton;