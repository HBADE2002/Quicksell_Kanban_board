// src/components/BoardColumn.js
import React from 'react';
import { Card } from 'antd';
import Ticket from './Ticket';

const BoardColumn = ({ title, tickets }) => { // Define BoardColumn component
  return (
    <div className="board-column"> 
      <h2>{title}</h2> 
      {tickets.map((ticket) => ( // Loop through tickets
        <Ticket key={ticket.id} ticket={ticket} /> // Add Ticket component
      ))} 
    </div>
  );
};

export default BoardColumn;
