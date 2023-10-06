// Dom elements
const menu = document.getElementById('menu');
const select = document.getElementById('numCards');
const start = document.getElementById('start');

// Configurating the menu
for ( let i = 4; i<=10; i+=2){ // From 4 to 10
    const n = i*i; // Get i²
    // Create a new option
    const op = document.createElement('option');

    // Set both value and content to n
    op.value=n;
    op.innerHTML=n;

    // Add the new option to the page
    select.appendChild(op);
}