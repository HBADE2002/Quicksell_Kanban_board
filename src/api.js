// src/api.js
export async function fetchTickets() { // Define fetchTickets function
    const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment'); // Fetch data from API
    const data = await response.json(); // Convert response to JSON
    return data;
  }
  