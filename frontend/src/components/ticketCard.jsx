

// import React from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { BASE_URL } from '../constants'; // Ensure this path is correct

// const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString();
// };

// const TicketCard = ({ ticket, onTicketClick, onCancelTicket }) => {
//     const isBookedStyle = ticket.isBooked ? 'booked' : 'not-booked';

//     const cancelTicket = async (ticketId) => {
//         try {
//             const response = await axios.put(`${BASE_URL}api/ticket/${ticketId}`);
//             console.log(response.data); 
//             toast.success("The ticket cancellation was successful.");
            
//             onCancelTicket(ticketId); 
//         } catch (error) {
//             console.error("Error cancelling ticket:", error);
//         }
//     };

//     return (
//         <div className="ticket-card" onClick={() => onTicketClick(ticket)}>
//             <h3>Ticket Details</h3>
//             {ticket.passengers && ticket.passengers.length >  0 && (
//                 <div>
//                     {ticket.passengers.map((passenger, index) => (
//                         <div key={index}>
//                             <p>Name: {passenger.name}</p>
//                             <p>Age: {passenger.age}</p>
//                             <p>Seat Number: {passenger.seatNumber}</p>
//                         </div>
//                     ))}
//                 </div>
//             )}
//             <p>Bus Number: {ticket.busNumber}</p>
//             <p>Departure Time: {(ticket.departureTime)}</p>
//             <p>Arrival Time: {(ticket.arrivalTime)}</p>
//             <p>Date: {formatDate(ticket.date)}</p>
//             <p>Origin: {ticket.origin}</p>
//             <p>Destination: {ticket.destination}</p>
//             <p>Number of Seats: {ticket.numberOfSeats}</p>
//             <p>Booking Date: {formatDate(ticket.bookingDate)}</p>
//             <p className={isBookedStyle}>Is Booked: {ticket.isBooked ? 'Yes' : 'No'}</p>
//             {ticket.isBooked && (
//                 <button className="cancel-ticket-button" onClick={() => cancelTicket(ticket._id)}>Cancel Ticket</button>
//             )}
//         </div>
//     );
// };

// export default TicketCard;

import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BASE_URL } from '../constants'; 
// import { fetchTickets } from '../pages/fetchTicket';




const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
};

const TicketCard = ({ ticket, onTicketClick}) => {
    const isBookedStyle = ticket.isBooked ? 'booked' : 'not-booked';

    
    const cancelTicket = async (ticketId) => {
        // Show confirmation dialog
        const confirmation = window.confirm("Are you sure you want to cancel the ticket?");
        if (!confirmation) {
            // If "No" is clicked, simply return
            return;
        }
    
        try {
            const response = await axios.put(`${BASE_URL}api/ticket/${ticketId}`);
            console.log(response.data); 
            toast.success("The ticket cancellation was successful.");
            
                
        } catch (error) {
            console.error("Error cancelling ticket:", error);
            
        }
    };
    
    

    return (
        <div className="ticket-card" onClick={() => onTicketClick(ticket)}>
            <h3>Ticket Details</h3>
            {ticket.passengers && ticket.passengers.length > 0 && (
                <div>
                    {ticket.passengers.map((passenger, index) => (
                        <div key={index}>
                            <p>Name: {passenger.name}</p>
                            <p>Age: {passenger.age}</p>
                            <p>Seat Number: {passenger.seatNumber}</p>
                        </div>
                    ))}
                </div>
            )}
            <p>Bus Number: {ticket.busNumber}</p>
            <p>Departure Time: {(ticket.departureTime)}</p>
            <p>Arrival Time: {(ticket.arrivalTime)}</p>
            <p>Date: {formatDate(ticket.date)}</p>
            <p>Origin: {ticket.origin}</p>
            <p>Destination: {ticket.destination}</p>
            <p>Number of Seats: {ticket.numberOfSeats}</p>
            <p>Booking Date: {formatDate(ticket.bookingDate)}</p>
            <p className={isBookedStyle}>Is Booked: {ticket.isBooked ? 'Yes' : 'No'}</p>
            {ticket.isBooked && (
                <button className="cancel-ticket-button" onClick={() => cancelTicket(ticket._id)}>Cancel Ticket</button>
            )}
        </div>
    );
};

export default TicketCard;








