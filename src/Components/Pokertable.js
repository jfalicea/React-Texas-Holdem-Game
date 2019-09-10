import React, {Component} from 'react';
import './PokerTable.css';
import PokerHand from './PokerHand';
import Deck from '../utilityClasses/Deck';

class PokerTable extends Component{
    constructor(){
        super();
        this.deck = new Deck(); //make a new deck object. 
        this.deck.create(); // create a deck from the deck object
        this.deck.shuffle(); //suffle the deck
        console.log("card",this.deck.cards)
        this.state = {
            playerHand: ["deck", "deck"],
            dealerHand: ["deck", "deck"],
            communityHand: ["deck", "deck","deck", "deck","deck"],
            wager: 0, 
            bankroll: 100,
            msg: ""
        }
    }

    checkHandRank = ()=>{
        let playerPlusCommHand = [...this.state.playerHand, ...this.state.communityHand]
        let dealerPlusCommHand = [...this.state.dealerHand, ...this.state.communityHand]
        const finalPlayerHand = playerPlusCommHand.map((card) => {
            return(
                card.replace(/10/g, 'T').replace(/11/g, 'J').replace(/12/g, 'Q').replace(/13/g, 'K').replace(/1/g,'A')
            )
        });
        const finalDealerHand = dealerPlusCommHand.map((card) => {
            return(
                card.replace(/10/g, 'T').replace(/11/g, 'J').replace(/12/g, 'Q').replace(/13/g, 'K').replace(/1/g,'A')
            )
        }); 

        const playerHandRank = window.Hand.solve(finalPlayerHand)
        const dealerHandRank = window.Hand.solve(finalDealerHand)
        const winner = window.Hand.winners([playerHandRank,dealerHandRank])
        console.log(playerHandRank)
        console.log(dealerHandRank)
        console.log("winner obj", typeof winner)
        console.log("winner obj", winner)
        console.log('winner ', winner.length === 2 ? "YOU TIED": winner[0].descr === playerHandRank.descr ? "player wins" : "dealer wins")
        this.setState({
            msg: winner.length === 2 ? "YOU TIED": winner[0].descr === playerHandRank.descr ? "player wins" : "dealer wins"
        }, this.clearMsg)
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
            dealerHand: [card2, card4],
            communityHand: ["deck","deck","deck","deck","deck"]
        })
    }

    bet = (amount)=>{
        const newWager = this.state.wager + amount; 
        const newBankRoll = this.state.bankroll - amount;
        if(newBankRoll >= 0){
        this.setState({            
            wager: newWager, 
            bankroll: newBankRoll
        })
        } else{
            this.setState({
                msg: "You don't have enough money!"
            }, this.clearMsg)
    }} 

    clearMsg = () =>{
        setTimeout(()=>{
            this.setState({
                msg:""
            })
        },2000)
    }
        //check calls to draw a new community card. 
    check = ()=>{
        let communityNewHand = [...this.state.communityHand]    //made copy so that we do not change state...we will let react do that. 
        if(communityNewHand[0]==='deck'){
            //this must be the flop 
            communityNewHand = [this.deck.cards.shift(),
                this.deck.cards.shift(),
                this.deck.cards.shift(),
            ]
        } else {
            //its not the flop. 
            communityNewHand.push(this.deck.cards.shift());
        }
        if(communityNewHand.length === 5){
            // all cards are dealt
            this.checkHandRank()
        }

        this.setState({
            communityHand: communityNewHand
        });
    }

    render(){
        return(
            <div className="the-table col-sm-12">
                <div className="col-sm-12 text-center the-numbers">
                    <div className="col-sm-3">Current Pot: ${this.state.wager}</div>
                    <div className="col-sm-3">Bankroll:  ${this.state.bankroll}</div>
                </div>
                <div className="col-sm-3">
                    {this.state.msg}
                </div>
                    <PokerHand cards={this.state.playerHand}/>   {/* Player 1 Hand */}
                    <PokerHand cards={this.state.communityHand}/>   {/* Communty Hand */}
                    <PokerHand cards={this.state.dealerHand}/>   {/* Dealer Hand */}
                    <div className="col-sm-12 buttons" >
                        <button onClick={this.prepDeck} className="btn btn-primary"> Deal</button>
                        <button onClick={()=>{this.bet(5)}} className="btn btn-success"> Bet 5</button>
                        <button onClick={this.check} className="btn btn-info"> Check</button>
                        <button onClick={this.prepDeck} className="btn btn-danger"> Fold</button>
                    </div>
            </div>
            )
        }
};

export default PokerTable;