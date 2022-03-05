import './labelledIconBox.css';

class LabelledIconBox extends React.Component {
    constructor(props) {
        super(props);
        this.icon = props.icon;
        this.label = props.label;
        this.stylingClass = props.stylingClass;
    }
    render() {
        return (
            <div className={`labelled-icon-box ${this.stylingClass || ''}`} style={}>
                <img src={this.icon} />
                <label>{this.label}</label>
            </div>
        );
    }
}

export default LabelledIconBox;