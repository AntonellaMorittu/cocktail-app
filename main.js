import { html, render } from 'lit-html';
import './style.css';

const searchCocktails = () => {
  console.log("Hello world!")
};


const template = () => html`
  <h1>Cocktail Assistant</h1>
  <input id="cocktail-input" type="text" placeholder="Search for a cocktail" />
   <button @click=${searchCocktails}>Search</button>

  <div id="cocktail-results"></div>

  <h2>Shopping List</h2>
  <ul id="shopping-list"></ul>
  <button id="print-btn">Print Shopping List</button>
`;

// Get the container where the template will be rendered
const appElement = document.querySelector('#app');

// Render the template to the app element
render(template(), appElement);