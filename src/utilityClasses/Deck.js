//creates a Card Deck Class: 

class Deck{
    constructor(){
        this.card = [];
    }
        //create a deck of cards. 
            //cards have a suite and a number.  two loops are needed one for suit and one for value. 
    create(){
        console.log(`here's a new deck.`)
        const suits = ['h', 's','d','c']
        suits.forEach((suit)=>{
            //innner loop for the value. 
            for(let c = 1; c <=13; c++){
                this.card.push(c + suit)
            }
        })
    }
        //shuffles a new deck of cards
    shuffle(){
        console.log(`shuffling.`)
    }
}





export default Deck;