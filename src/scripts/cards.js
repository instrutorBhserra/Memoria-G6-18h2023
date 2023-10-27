// Class to manage crad creation and actions
class CardManager{
    // Attributes
    flippedCards = new Set();
    urlFactory;

    constructor(factory){
        this.urlFactory = factory;
    }

    // Generate a new card based in the hero number
    gen(heroNumber){
        const template = document.getElementById("cardTemplate");
        const clone = template.content.cloneNode(true);

        // Get reference tot he image element
        const img = clone.querySelector('img');

        // Change the source of the image
        img.setAttribute('src', this.urlFactory(heroNumber));

        clone.children[0].addEventListener('click',
        event=>this.onClick(event)
        );

        return clone; // Return the modified clone
    }

    // Handle click events
    onClick(event){
        if(this.flippedCards.size == 2 ) this.endTurn();
        else this.flip(event.target);
    }

    // Flip the received card
    flip(cardNode){
        cardNode.children[0].classList.add('selected');
        this.flippedCards.add(cardNode);
    }

    // Unflip the received card
    unFlip(cardNode){
        cardNode.children[0].classList.remove('selected');
    }

    // Set the received card as matched
    disable(cardNode){
        cardNode.children[0].classList.add('matched');
        this.unFlip(cardNode);
    }

    // Turn methods
    // Check if is a match
    check(){
        // Turn the set into an array and map it
        const urls = [...this.flippedCards].map((card)=>card.querySelector('img').src);
        return urls[0] == urls[1];
    }

    // Finish a turn
    endTurn(){
        // Choose the end turn function
        const handler = this.check()? (card)=>this.disable(card): this.unFlip;

        // Run the handler and clear set
        this.flippedCards.forEach(handler);
        this.flippedCards.clear();
    }


}
