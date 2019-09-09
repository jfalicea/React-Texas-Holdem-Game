//this component shows a hand of cards
import React from 'react'
import Card from './Card'


function PokerHand(props){
    return(
        //a poker hand is made up of cards. 
        <div className="poker-hand col-sm-12">
            <Card />
            <Card />
        </div>
    ) 
}

export default PokerHand;