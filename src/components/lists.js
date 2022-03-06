import './lists.css'

export function VerticalList(props) {
    const childElements = props.values.map((value) => value);
    return (
        <div id={props.id || ""} className='vertical-list'>
            {childElements}
        </div>
    );
}