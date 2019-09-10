import React, {Component} from 'react';
import './PokerTable.css';
import PokerHand from './PokerHand';
import Deck from '../utilityClasses/Deck';

class PokerTable extends Component{
    constructor(){
        super();
        this.deck = new Deck();
        this.deck.create();
        this.deck.shuffle();
        console.log("card",this.deck.cards)
        this.state = {
            playerHand: ["deck", "deck"],
            dealerHand: ["deck", "deck"],
            communityHand: ["deck", "deck","deck", "deck"]
        }
    }
        //using rocket function because we dont want to change the scope of 'this'.   this function deasl the first 4 cards. 
         
    prepDeck = () => {  
        this.deck.create();
        this.deck.shuffle();
        const card1 = this.deck.cards.shift();
        const card2 = this.deck.cards.shift();
        const card3 = this.deck.cards.shift();
        const card4 = this.deck.cards.shift();
    //at this point, this.deck.cards has 48 elements in it, because 4 cards have been dealt. 
        this.setState({
            playerHand: [card1, card3],
            dealerHand: [card2, card4]
        })
    }

    render(){
        return(
            <div className="the-table col-sm-12">
                    <PokerHand cards={this.state.playerHand}/>   {/* Player 1 Hand */}
                    <PokerHand cards={this.state.communityHand}/>   {/* Communty Hand */}
                    <PokerHand cards={this.state.dealerHand}/>   {/* Player 2 Hand */}
                    <div className="col-sm-12 buttons" >
                        <button onClick={this.prepDeck} className="btn btn-primary"> Deal</button>
                        <button onClick={this.prepDeck} className="btn btn-success"> Bet 5</button>
                        <button onClick={this.prepDeck} className="btn btn-info"> Check</button>
                        <button onClick={this.prepDeck} className="btn btn-danger"> Fold</button>
                    </div>
            </div>
            )
        }
};

export default PokerTable;