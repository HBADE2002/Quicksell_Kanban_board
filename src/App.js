// src/App.js
import React from 'react';
import './App.css'; // Import App styles
import KanbanBoard from './components/KanbanBoard';

function App() {
  return (
    <div className="app">
      <header className="app-header"> 
        <h1>Kanban Board App</h1>
      </header>
      <main className="app-main">
        <KanbanBoard />
      </main>
      <footer className="app-footer">
        <p>© 2023 Kanban Board App</p>
      </footer>
    </div>
  );
}

export default App;
