import { component, useEffect, useState } from 'haunted';
import { html, render } from 'lit';
import { AppStyles } from "./AppStyles";

const CocktailApp = () => {
  const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php"
  const [query, setQuery] = useState('')
  const [cocktails, setCocktails] = useState([])
  const [shoppingList, setShoppingList] = useState([])
  const [toasterMessage, setToasterMessage] = useState("")


  const searchCocktails = async () => {
    setToasterMessage("Searching...")

    await new Promise(resolve => setTimeout(resolve, 500)) // 500 ms delay

    if (query.trim()) {
      try {
        const response = await fetch(`${url}?s=${query}`)
        const data = await response.json()
        setCocktails(data.drinks || [])

        if (data.drinks && data.drinks.length > 0) {
          setToasterMessage("Here are the results!")
        } else {
          setToasterMessage("No results found.")
        }
      } catch (error) {
        console.error('Error', error)
        setToasterMessage("Error fetching results.")
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
      .filter(ingredient => !shoppingList.includes(ingredient))

    // Update the shopping list
    setShoppingList(prevList => [...prevList, ...newItems])
    setToasterMessage("Ingredients added to shopping list.")
  };

  const printShoppingList = (shoppingList) => {
    const newWindow = window.open("")
    newWindow.document.write(`
      Here's your shopping list: ${shoppingList}
    `);

    newWindow.document.close()
    newWindow.print();
  };

  useEffect(() => {
    if (toasterMessage) {
      const timer = setTimeout(() => {
        setToasterMessage('')
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [toasterMessage])



  // UI Template
  const template = () => html`
     <style>
      ${AppStyles}
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
      ${toasterMessage ? html`<div class="toaster">${toasterMessage}</div>` : ''}
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

   
        ${cocktails.length > 0
      ? html`
           <div class="list">
            <h3>Shopping List</h3>
            ${shoppingList.length === 0 ? "Your shopping list is empty" : null}
            <ul id="shopping-list" class="shopping-list">
              ${shoppingList.map(item => html`<li>${item}</li>`)}
            </ul>
            ${shoppingList.length > 0
          ? html`<button @click=${() => printShoppingList(shoppingList)} class="btn">Print</button>`
          : ""}
          `
      : ""}   
        </div>
    </div>  
  `

  return template()
};

// Render Haunted component
customElements.define('cocktail-app', component(CocktailApp))

// Render the CocktailApp component into the app element
const appElement = document.querySelector('#app');
render(html`<cocktail-app></cocktail-app>`, appElement)
