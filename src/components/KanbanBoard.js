import React, { useState, useEffect } from 'react';
import { fetchTickets } from '../api';
import BoardColumn from './BoardColumn';
import { Select, Button } from 'antd';
import 'antd/dist/reset.css'; // Import Ant Design styles
import './KanbanBoard.css'; // Import  KanbanBoard styles

const { Option } = Select; // Destructure Option

const KanbanBoard = () => { // Define KanbanBoard component
  const [tickets, setTickets] = useState([]); // Initialize tickets state
  const [groupingOption, setGroupingOption] = useState(localStorage.getItem('groupingOption') || 'status'); // Initialize groupingOption state
  const [sortedBy, setSortedBy] = useState(localStorage.getItem('sortedBy') || 'priority'); // Initialize sortedBy state
  
  useEffect(() => { // Define useEffect hook
    async function fetchData() { // Define fetchData function
      const data = await fetchTickets(); // Call fetchTickets function
      setTickets(data.tickets); // Update tickets state
    }
    fetchData(); // Call fetchData function
  }, []);


  useEffect(() => { 
    localStorage.setItem('groupingOption', groupingOption); 
  }, [groupingOption]);  

  useEffect(() => {  
    localStorage.setItem('sortedBy', sortedBy); 
  }, [sortedBy]);

  const groupTicketsByOption = (tickets, option) => { // Define groupTicketsByOption function
    const groupedTickets = {}; // Initialize groupedTickets object

    tickets.forEach((ticket) => { // Loop through tickets
      const key = option === 'status' ? ticket.status : option === 'user' ? ticket.user : ticket.priority; // Define key
      if (!groupedTickets[key]) { // Check if key does not exist in groupedTickets
        groupedTickets[key] = []; // Add key to groupedTickets
      }
      groupedTickets[key].push(ticket); // Push ticket to groupedTickets
    });

    return groupedTickets; 
  };

  const sortTicketsByOption = (groupedTickets, option) => { // Define sortTicketsByOption function
    const sortedTickets = {}; // Initialize sortedTickets object

    Object.keys(groupedTickets).forEach((groupTitle) => { // Loop through groupedTickets
      const group = groupedTickets[groupTitle]; // Define group
      sortedTickets[groupTitle] = // Add sorted group to sortedTickets
        option === 'priority' // Check if option is priority
          ? group.sort((a, b) => b.priority - a.priority) // Sort by priority
          : group.sort((a, b) => a.title.localeCompare(b.title)); // Sort by title
    });

    return sortedTickets; 
  };

  const groupedTickets = groupTicketsByOption(tickets, groupingOption); // Define groupedTickets
  const sortedTickets = sortTicketsByOption(groupedTickets, sortedBy); // Define sortedTickets

  return (
    <div className="kanban-board"> 
      <div className="options">
        <Select // Add Select component
          value={groupingOption}
          onChange={(value) => setGroupingOption(value)}
          style={{ width: 180, marginRight: 10 }} // Add style
        >
          <Option value="status">Group by Status</Option> 
          <Option value="user">Group by User</Option>
          <Option value="priority">Group by Priority</Option>
        </Select>
        <Button onClick={() => setSortedBy('priority')} type="primary"> 
          Sort by Priority
        </Button>
        <Button onClick={() => setSortedBy('title')} type="primary">
          Sort by Title
        </Button>
      </div>
      <div className="board-columns">
        {Object.keys(sortedTickets).map((groupTitle) => ( // Loop through sortedTickets
          <BoardColumn key={groupTitle} title={groupTitle} tickets={sortedTickets[groupTitle]} /> // Add BoardColumn component
        ))}
        
      </div>
    </div>
  );
};

export default KanbanBoard;
