//this component shows a hand of cards
import React from 'react'
import Card from './Card'


function PokerHand(props){
    console.log("pokerhand", props)
    const hand = props.cards.map((card, i)=>{
       return( <Card key={i} card={card} />)
    })
    return(
        //a poker hand is made up of cards. 
        <div className="poker-hand col-sm-12">
            {hand}
        </div>
    ) 
}

export default PokerHand;