import './lists.css'
import React from 'react';

export const VerticalList = React.forwardRef((props, ref) => {
    return (
        <div ref={ref} id={props.id || ""} className='vertical-list'>
            {props.values}
        </div>
    );
});

export const HorizontalList = React.forwardRef((props, ref) => {
    return (
        <div ref={ref} id={props.id || ""} className='horizontal-list'>
            {props.values}
        </div>
    );
});