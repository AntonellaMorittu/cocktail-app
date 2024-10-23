import { component, useState } from 'haunted';
import { css, html, render } from 'lit';

const CocktailApp = () => {
  const [query, setQuery] = useState('');
  const [cocktails, setCocktails] = useState([]);
  const [shoppingList, setShoppingList] = useState([]);



  const searchCocktails = async () => {
    if (query.trim()) {
      try {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`);
        const data = await response.json();
        setCocktails(data.drinks || []);
        console.log("Cocktails", data.drinks);
      } catch (error) {
        console.error('Error', error);
      }
    }
  };

  const addToShoppingList = (cocktail) => {
    const newItems = Object.keys(cocktail)
      // Get the ingredient names that are truthy and not already in the shopping list
      .filter(key => key.startsWith('strIngredient') && cocktail[key])
      // Map to ingredient names
      .map(key => cocktail[key])
      // Filter out existing ingredients
      .filter(ingredient => !shoppingList.includes(ingredient));

    // Update the shopping list
    setShoppingList(prevList => [...prevList, ...newItems]);
  };

  const printShoppingList = (shoppingList) => {
    const newWindow = window.open(""); // Open a new window
    newWindow.alert(`
      Here's your shopping list: ${shoppingList}
    `);

  };

  const styles = css`
    .wrapper {
      padding: 20px;
      font-family; sans-serif;
    }
    .search {
      display: "flex";
      text-align: center;
    }
    .btn {
      background: black;
      padding: 13px;
      color: white;
      cursor: pointer;
    }
    .input {
       height: 40px;
       width: 40%;
    }
    .results-container {
      display: flex; 
      justify-content: space-between;
      gap: 20px; 
      margin: 40px 0;
    }
    .cocktails {
      width: 70%;
    }
    .cocktail-item {
      display: flex;
      margin-bottom: 40px;
      border: 1px solid #ccc;
      padding: 16px;
      border-radius: 5px;
      align-items: center;
    }
    .cocktail-image {
      flex: 0.5
    }
    .cocktail-image img {
      width: 100%;    
      height: auto; 
      margin-right: 20px;
      flex: 1;     
    }
    #name {
      margin: 0;
    } 
    .cocktail-details {
      flex: 1;                     
      padding: 0 10px;   
      align-self: flex-start;
    }
     .add-btn {
      flex: 0 0 auto;  
      padding: 10px;   
      align-self: end;
    }  
    .list {
      width: 30%;
    } 
   
  `;

  // UI Template
  const template = () => html`
    <style>
      ${styles}
    </style>
    <div class="wrapper">
      <!-- search bar -->
      <div class="search">
        <input 
          id="cocktail-input" 
          type="text" 
          placeholder="Search for a cocktail.." 
          @input=${(e) => setQuery(e.target.value)} 
          class="input"
        />
        <button @click=${searchCocktails} class="btn">Search</button>
      </div>

      <!-- Content -->
       <div class="results-container">
       
        <div class="cocktails">
     
          ${cocktails.map(cocktail => html`
            <div class="cocktail-item">
              <div class="cocktail-image">
                <img src="${cocktail.strDrinkThumb}" alt="${cocktail.strDrink}" />
              </div>
              <div class="cocktail-details">
                <h3 id="name">${cocktail.strDrink} 🍸</h3>
                <p>${cocktail.strInstructions}</p>
                <h4>Ingredients:</h4>
                <ul>
                  ${Object.keys(cocktail)
      // This checks if the value for that key in the cocktail object is truthy. This is important because some ingredient fields may be empty.
      .filter(key => key.startsWith('strIngredient') && cocktail[key])
      .map(key => html`<li>${cocktail[key]}</li>`)}
                </ul>
              </div>
              <span class="add-btn">
                <button @click=${() => addToShoppingList(cocktail)} class="btn">＋</button>
              </span>
            </div>
          `)}
        </div>

        <div class="list">
        <ul id="shopping-list" class="shopping-list">
            ${shoppingList.map(item => html`<li>${item}</li>`)}
          </ul>
          
          ${shoppingList.length > 0
      ? html`<button @click=${() => printShoppingList(shoppingList)} class="btn">Print Shopping List</button>`
      : ""}

      </div>
    </div>  
  `;

  return template();
};

// Render Haunted component
customElements.define('cocktail-app', component(CocktailApp));

// Render the CocktailApp component into the app element
const appElement = document.querySelector('#app');
render(html`<cocktail-app></cocktail-app>`, appElement);
