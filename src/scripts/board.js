// Class to manage board actions
class BoardManager{
    // Dependencies
    cardManager // Object to manipulate cards inside the board

    // DOM elements
    node; // The DOM element refering to the board

    // Numbers
    numImgs; // Number of different images in the library
    curNumCards; // Current number of cards inthe board

    // Constructor
    constructor ( id, numImgs, cardManager){
        // Get the board node using the received id
        this.node = document.getElementById(id);

        // Sett the other properties
        this.numImgs = numImgs;
        this.cardManager = cardManager;
    }

    // clear the board removing all cards   
    clear(){
        this.node.innerHTML = "";
    }

    // Add the received number of cards to the board
    fill(numberCards){
        // Test fi there isn't enough images
        if(numberCards>2*this.numImgs){
            // Show error message
            console.error(`Error: Not enough images for ${numberCards} cards.`)
            // Adjust the number of cards and continue the game
            numberCards = 2*this.numImgs;
        }

        // numberCards should be an integer
        numberCards= parseInt(numberCards);
        // Setting curNumCards
        this.curNumCards = numberCards;

        this.clear()
        this.genRandomList(numberCards).forEach((number)=>this.addCard(this.cardManager.gen(number)));

        this.adjustCSS();
    }

    // Adjust the css to fit all cards in the board
    adjustCSS(){
        // Calculating the number of columns
        const cols = Math.sqrt(this.curNumCards);
        // Calculating the card size
        let size = (100/cols-1)
        // Turning the size into a CSS string
        size+="vmin";

        // Setting the CSS properties
        document.documentElement.style.setProperty('--numCols', cols);
        document.documentElement.style.setProperty('--size', size);
    }

    // Add one card to the board
    addCard(card){
        this.node.appendChild(card);
    }

    // Generate random list
    genRandomList(size){
        // Create a list with the numbers 1 to size
        let list = Array(size/2).fill().map((_,i)=>i+1);
        // Double that list and shuffle it
        list = [...list, ...list].sort(()=>Math.random()-.5);
        return list;
    }

    // Check if all cards are found
    check(){
        // Get all found cards
        const flipped = document.getElementsByClassName('matched');
        // Return if it is equal the expected number of cards
        return fipped.length >= this.curNumCards;
    }
}