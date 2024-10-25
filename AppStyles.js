import { css } from 'lit';

export const AppStyles = css`
  .wrapper {
    padding: 20px;
    font-family; 'Helvetica', 'Arial', sans-serif;
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
    height: fit-content;
    border: 1px solid lightgrey;
    border-radius: 4px;
    padding: 10px;
  } 
    .toaster {
    position: absolute;
    bottom: 20px; 
    right: 30px;
    padding: 10px;
    border-radius: 5px;
    color: black;
    border: 1px solid lightgrey;
  }
`