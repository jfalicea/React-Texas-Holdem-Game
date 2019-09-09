//creates a Card Deck Class: 

class Deck{
    constructor(){
        this.cards = [];
    }
        //create a deck of cards. 
            //cards have a suite and a number.  two loops are needed one for suit and one for value. 
    create(){
        console.log(`here's a new deck.`)
        const suits = ['h', 's','d','c']
        suits.forEach((suit)=>{
            //innner loop for the value. 
            for(let c = 1; c <=13; c++){
                this.cards.push(c + suit)
            }
        })
    }
        //shuffles a new deck of cards
        //to shufff: swap two incidies in the array many, may times. 
    shuffle(){
        console.log(`shuffling.`)
       for(let i = 0; i < 1000000;i++){
        let rand1 = Math.floor(Math.random()*52)
        let rand2 = Math.floor(Math.random()*52)
            // store the value in this.deck[random1] in a temp var
        let temp =this.cards[rand1]
        //put the value of card 2 as the value of card 1 
        this.cards[rand1] = this.cards[rand2]
        // put the value of card 1 as the value of card 2
        this.cards[rand2] = temp
       }
    }
}





export default Deck;