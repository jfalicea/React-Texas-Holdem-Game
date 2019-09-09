//shows cars in the poker hands. 
import React from 'react';

function Card(props){
    const thisCard = `/cards/${props.card}.png`
    return(
        <div className="col-sm-2 card">
            <img src={thisCard} />
        </div>
    )
}

export default Card;