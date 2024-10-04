


import axios from 'axios';
import { BASE_URL } from '../constants';
import { toast } from 'react-toastify';

export const fetchTickets = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/api/getAllTicket`);
        const tickets = response.data;
        console.log(tickets)

        // Check if the user didn't book any ticket
        if (tickets.length === 0) {
            // Display an error message using toast
            toast.error("No tickets were found for the user.");
            return [];
        }

        return tickets;
    } catch (error) {
        console.error('Failed to fetch tickets:', error);
        
        throw error; // Re-throw the error so it can be handled by the caller
    }
};
