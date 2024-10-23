import { component, useState } from 'haunted';
import { css, html, render } from 'lit';

const CocktailApp = () => {
  const [query, setQuery] = useState('');
  const [cocktails, setCocktails] = useState([]);

  const searchCocktails = async () => {
    if (query.trim()) {
      try {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`);
        const data = await response.json();
        setCocktails(data.drinks || []);
        console.log("Cocktails fetched:", data.drinks);
      } catch (error) {
        console.error('Error fetching cocktails:', error);
      }
    }
  };

  // Define CSS styles as a string
  const styles = css`
    #cocktail-results {
      margin-top: 20px;
    }
    .cocktail-item {
      display: flex;
      margin-bottom: 20px;
      border: 1px solid #ccc;
      padding: 10px;
      border-radius: 5px;
    }
    .cocktail-image img {
      width: 100px;
      height: auto;
      margin-right: 20px;
    }
  `;

  // UI Template
  const template = () => html`
    <style>
      ${styles}
    </style>
    
    <h1>Cocktail Assistant</h1>
    <input 
      id="cocktail-input" 
      type="text" 
      placeholder="Search for a cocktail" 
      @input=${(e) => setQuery(e.target.value)} 
    />
    <button @click=${searchCocktails}>Search</button>

    <div id="cocktail-results">
      ${cocktails.map(cocktail => html`
        <div class="cocktail-item">
          <div class="cocktail-image">
            <img src="${cocktail.strDrinkThumb}" alt="${cocktail.strDrink}" />
          </div>
          <div class="cocktail-details">
            <h3>${cocktail.strDrink}</h3>
            <p>${cocktail.strInstructions}</p>
            <h4>Ingredients:</h4>
            <ul>
              ${Object.keys(cocktail)
      .filter(key => key.startsWith('strIngredient') && cocktail[key]) // Filter for ingredients
      .map(key => html`<li>${cocktail[key]}</li>`)}
            </ul>
            <button @click=${() => addToShoppingList(cocktail)}>Add to Shopping List</button>
          </div>
        </div>
      `)}
    </div>

    <h2>Shopping List</h2>
    <ul id="shopping-list"></ul>
    <button id="print-btn">Print Shopping List</button>
  `;

  const addToShoppingList = (cocktail) => {
    // Implement shopping list functionality here
    console.log('Added to shopping list:', cocktail);
  };

  return template();
};

// Render Haunted component
customElements.define('cocktail-app', component(CocktailApp));

// Render the CocktailApp component into the app element
const appElement = document.querySelector('#app');
render(html`<cocktail-app></cocktail-app>`, appElement);
