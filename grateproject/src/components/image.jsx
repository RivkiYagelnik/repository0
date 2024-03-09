import React, { useState } from 'react';
import { render } from 'react-dom';
import { Redirect } from 'react-router-dom'


export default function Images(props) {
    const [Picture, setPicture] = useState(0);
    const imageCount = React.Children.count(props.children);

    function returenPicture(index) {
        const imageChild = React.Children.toArray(props.children)[index];
        return React.cloneElement(imageChild);
    }

    return (
        <>
            <button
                disabled={Picture === 0}
                onClick={(e) => setPicture(v => v - 1)}
            >&lt; Previous Page
            </button>

            <button
                disabled={Picture >= imageCount - 1}
                onClick={(e) => setPicture(v => v + 1)}
            >Next Page &gt;</button>
            <br></br>
            {returenPicture(Picture)}
        </>
    )
}
