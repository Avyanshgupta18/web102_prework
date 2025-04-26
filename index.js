/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // STEP 1 – loop over each item in the data
    for (const game of games) {

        // STEP 2 – create a new div that will become the game card
        const card = document.createElement("div");
        card.classList.add("game-card");

        // STEP 3 – set the inner HTML of the card with a template literal
        card.innerHTML = `
            <img class="game-img" src="${game.img}" alt="Cover art for ${game.name}" />
            <h3>${game.name}</h3>
            <p>${game.description}</p>
            <p><strong>Pledged:</strong> $${game.pledged.toLocaleString()}</p>
            <p><strong>Backers:</strong> ${game.backers.toLocaleString()}</p>
        `;

        // STEP 4 – append the card to the games-container so it shows on the page
        gamesContainer.appendChild(card);
    }
}

// STEP 5 – call the function so all games are added when the page loads
addGamesToPage(GAMES_JSON);

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce(
    (acc, game) => acc + game.backers,
    0
  );
  contributionsCard.innerHTML = totalContributions.toLocaleString("en-US");

// set the inner HTML using a template literal and toLocaleString to get a number with commas


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

// set inner HTML using template literal
const totalRaised = GAMES_JSON.reduce(
    (acc, game) => acc + game.pledged,
    0
  );
  raisedCard.innerHTML = `$${totalRaised.toLocaleString("en-US")}`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML = GAMES_JSON.length.toLocaleString("en-US");

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal


    // use the function we previously created to add the unfunded games to the DOM

}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    deleteChildElements(gamesContainer);
    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);

    // add the funded games to the DOM
    addGamesToPage(fundedGames);


    // use the function we previously created to add unfunded games to the DOM

}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);
    

    // STEP 3 – add all games back to the DOM
    addGamesToPage(GAMES_JSON);



    // add all games from the JSON data to the DOM

}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click",   filterFundedOnly);
allBtn.     addEventListener("click", showAllGames);

// add event listeners with the correct functions to each button


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const unfundedCount = GAMES_JSON.filter(game => game.pledged < game.goal).length;
const companyBlurb = `
    A total of <strong>$${GAMES_JSON
        .reduce((acc, g) => acc + g.pledged, 0)
        .toLocaleString("en-US")}</strong> has been raised for 
    <strong>${GAMES_JSON.length}</strong> games. 
    Currently, <strong>${unfundedCount}</strong> 
    ${unfundedCount === 1 ? "game remains" : "games remain"} unfunded.
    We need your help to make these projects a reality!
`;

// STEP 3 – create a <p>, add the blurb, and append it to the description container
const descriptionParagraph = document.createElement("p");
descriptionParagraph.innerHTML = companyBlurb.trim();
descriptionContainer.appendChild(descriptionParagraph);

// create a string that explains the number of unfunded games using the ternary operator


// create a new DOM element containing the template string and append it to the description container

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// sortedGames is already defined earlier ⇧
// STEP 1 – use destructuring + spread to grab top two
const [topGame, secondGame, ...rest] = sortedGames;

// STEP 2 – create elements to show their names
const topName    = document.createElement("p");
topName.textContent = topGame.name;
firstGameContainer.appendChild(topName);

const runnerName = document.createElement("p");
runnerName.textContent = secondGame.name;
secondGameContainer.appendChild(runnerName);
// use destructuring and the spread operator to grab the first and second games

// create a new element to hold the name of the top pledge game, then append it to the correct element

// do the same for the runner up item