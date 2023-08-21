// Ticket.js
import React from 'react';
import CardComponent from './Card'; // Import Card component

import { CheckCircleOutlined, ExclamationCircleOutlined, UserOutlined } from '@ant-design/icons'; // Import Ant Design icons

const Ticket = ({ ticket }) => { // Define Ticket component
  const { title, status, priority, user } = ticket; // Destructure ticket

  return ( // Return JSX
    <CardComponent
      title={title} // Add title prop
      description={
        <>
          <span>
            <CheckCircleOutlined style={{ marginRight: '5px', color: '#52c41a' }} />
            Status: {status}
          </span>
          <br />
          <span>
            <ExclamationCircleOutlined style={{ marginRight: '5px', color: '#faad14' }} />
            Priority: {priority}
          </span>
          <br />
          <span>
            <UserOutlined style={{ marginRight: '5px' }} /> 
            Assigned to: {user}
          </span>
        </>
      }
      buttonText="View Details" // Add buttonText prop
    />
  ); // End of JSX
};

export default Ticket;
