
import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../constants';
import { setTrips, clearTrips } from '../slices/tripSlice';
import { setTicket } from '../slices/ticketSlice';
import { toast } from 'react-toastify';
import axios from 'axios';
import PaymentForm from '../components/payment';
import { fetchTickets } from '../components/fetchTicket';
import TicketCard from '../components/ticketCard';



export default function BusManagement() {
    const [showBusManagement, setShowBusManagement] = useState(true);
    const [showBookingForm, setShowBookingForm] = useState(false);
    const [showCheckForm, setShowCheckForm] = useState(false);
    const [selectedTripId, setSelectedTripId] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);

    const [showBookedForm, setShowBookedForm] = useState(false);
    const [availableSeats, setAvailableSeats] = useState([]); 
    const [tickets, setTickets] = useState([]);
    const [showTickets, setShowTickets] = useState(false)
    const [showTicketModal, setShowTicketModal] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [passengerDetails, setPassengerDetails] = useState([]);
    const [isFormValid, setIsFormValid] = useState(false);

    
    const [showGoBackButton, setShowGoBackButton] = useState(false);
    

    const dispatch = useDispatch();
    const trips = useSelector((state) => state.trips.trips);
    

    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchTickets();
                console.log(data)
                setTickets(data);
            } catch (error) {
                console.error('Error fetching tickets:', error);
            }
        };

        fetchData();
    }, []);

    const handleGoBackClick = () => {
        setShowBusManagement(true);
        setShowBookingForm(false);
        setShowCheckForm(false);
        setShowBookedForm(false);
        setShowGoBackButton(false);
        setTickets([]);
        dispatch(clearTrips());
    };

    const handleTicketClick = (ticket) => {
        setSelectedTicket(ticket);
        setShowTicketModal(true);
    };

    const closeTicketModal = () => {
        setShowTicketModal(false);
    };

    const CheckTrip1 = () => {
        setShowBusManagement(false);
        setShowCheckForm(true);
        dispatch(clearTrips());
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const from = document.getElementById('from').value;
            const to = document.getElementById('to').value;
            const date = document.getElementById('date').value;

            const res = await axios.get(`${BASE_URL}/api/trip/search?from=${from}&to=${to}&date=${date}`);
            const data = await res.data;

            dispatch(setTrips(data));
            toast.success('Trip search successful!');
        } catch (err) {
            const response = err.response;
            if (response && response.status ===   404) {
                toast.warn(response ? response.data.message : err.message);
            } else {
                toast.error(response ? response.data.message : err.message);
            }
        }
    };

    const handleTripSelect = (tripId) => {
        setShowGoBackButton(true);
        setSelectedTripId(tripId);
        setShowCheckForm(false);
        setShowBookingForm(true);
        
        // Find the selected trip
        const selectedTrip = trips.find((trip) => trip._id === tripId);
        // Calculate the total number of seats (available + booked)
        // Assuming bookedSeats is an array of seat numbers for the selected trip
        const totalSeats = selectedTrip.availableSeats + selectedTrip.bookedSeats.length;
        // Generate seat numbers based on the total number of seats
        setAvailableSeats(generateSeatNumbers(totalSeats));
    };
    
    
    const handleSeatSelection = (seatNumber) => {
        if (!availableSeats.includes(seatNumber)) {
            toast.warn('This seat has already been booked.');
            return;
        }

        setSelectedSeats((prevSeats) => {
            const updatedSeats = prevSeats.includes(seatNumber)
                ? prevSeats.filter((seat) => seat !== seatNumber)
                : [...prevSeats, seatNumber];

            const selectedTrip = trips.find((trip) => trip._id === selectedTripId);
            const newTotalAmount = updatedSeats.length * selectedTrip.price;
            setTotalAmount(newTotalAmount);

            return updatedSeats;
        });
    };


    const isSeatBooked = (seatNumber) => {
        // Assuming `trips` contains the trip details including bookedSeats
        const selectedTrip = trips.find((trip) => trip._id === selectedTripId);
        return selectedTrip && selectedTrip.bookedSeats.includes(seatNumber);
    };
    
    
    
    
    const handlePassengerFormSubmit = (index, field) => (e) => {
        e.preventDefault();
        const value = e.target.value;

        if (!value.trim()) {
            // Alert the user if the field is empty
            alert(`Please fill in the ${field === 'name' ? 'name' : 'age'} field.`);
            return;
        }
    
        setPassengerDetails((prevDetails) => {
            const updatedDetails = [...prevDetails];
            updatedDetails[index] = {
                ...updatedDetails[index],
                [field]: value
            };
            return updatedDetails;
        });
        
        const allFieldsFilled = passengerDetails.every(passenger => passenger.name && passenger.age);
        
        setIsFormValid(allFieldsFilled);
        
    };
    
    

    const handlePayment = async () => {
        console.log('Paying for ticket with total amount:', totalAmount);
        console.log('Passenger Details:', passengerDetails);

        if (!isFormValid) {
            toast.error('Please fill in all passenger details.');
            return;
        }

        // Prepare the passengers array with the selected seat numbers
        const passengers = passengerDetails.map((details, index) => ({
            name: details.name,
            age: details.age,
            seatNumber: selectedSeats[index]
        }));

        // Make the API call to book the ticket
        try {
            const res = await axios.post(`${BASE_URL}/api/ticket/ticket/${selectedTripId}`, {
                passengers
            });
            const data=res.data
            console.log(data)
            dispatch(setTicket(data));

            if (res.status ===   200) {
                toast.success('Payment sucessfull! Ticket booked successfully!');
                
                }else{
                toast.error('Failed to book ticket.');
            }
        } catch (err) {
            toast.error(err.message);
            console.log('Error:',err)
        }
    };


    const handleCheckTicketClick = async () => {
        try {
            const tickets = await fetchTickets(); // Fetch all tickets
            setTickets(tickets);
            console.log(tickets)
            setShowTickets(true);
            setShowBusManagement(false);
            setShowGoBackButton(true);
        } catch (error) {
            console.error('Error fetching tickets:', error);
            // Handle the error, e.g., show a toast notification or update the UI
        }
    };
    
    
    

    const generateSeatNumbers = (count) => {
        const seatNumbers = [];
        for (let i =   1; i <= count; i++) {
            seatNumbers.push(i);
        }
        return seatNumbers;
    };



    

    return (
        <div>
            {showBusManagement && (
                <div>
                    <div className="button-con">
                        <button onClick={CheckTrip1}>Check Trip</button>
                        <button onClick={handleCheckTicketClick}>Check Ticket </button>
                    </div>
                    <div><br></br><br></br><p>For the "Check Trip" feature, you can use <span>kanyakumari</span> as the departure location, <span>Coimbatore</span> as the destination, and select the <span>date</span> as 23-07-2024 for testing purposes.</p></div>
                </div>
            )}

            {showCheckForm && (
                <div className='find-container'>
                    <div className='find'>
                    <label for="fname">From:</label>
                    <input type="text" id="from" name="from" />
                    <label htmlFor="to">To:</label>
                    <input type="text" id="to" name="to" />
                    <label htmlFor="date" >Date:</label>
                    <input type="date" id="date" name="date" />
                    <button onClick={submitHandler}>Search</button>
                    <div className="goBack1">
                        <button onClick={handleGoBackClick}>Go Back</button>
                    </div>
                    </div>
                </div>
            )}

            {showCheckForm && trips && trips.length >   0 && (
                <div>
                    <h2>Trip Details:</h2>
                    {trips.map((trip, index) => (
                        <div key={index} className="trip-details">
                            <p>Origin: {trip.origin}</p>
                            <p>Destination: {trip.destination}</p>
                            <p>Date: {new Date(trip.date).toLocaleDateString()}</p>
                            <p>AvailableSeats:{trip.availableSeats}</p>
                            <button onClick={() => handleTripSelect(trip._id)}>Book Seat</button>
                        </div>
                    ))}
                </div>
            )}
            {showBookingForm && selectedTripId && (
                <div className="seat-container">
                    <h2>Available Seats:</h2>
                        <div className="seat-grid">
                            {availableSeats.map((seatNumber, index) => (
                                <div key={index} className="seat-item">
                                    <input
                                    type="checkbox"
                                    id={`seat-${seatNumber}`}
                                    name={`seat-${seatNumber}`}
                                    value={seatNumber}
                                    // Assuming you have a state to track selected seats
                                    checked={selectedSeats.includes(seatNumber)}
                                    onChange={() => handleSeatSelection(seatNumber)}
                                    // Disable the seat if it's not available
                                    disabled={isSeatBooked(seatNumber)}
                                    // disabled={bookedSeats.includes(seatNumber)}
                                    />
                                    <label htmlFor={`seat-${seatNumber}`} className="seat-label">{seatNumber}</label>
                                </div>
                            ))}
                        </div>
                        <br />
        
        
                {totalAmount > 0 && selectedTripId && (
            <PaymentForm
                totalAmount={totalAmount}
                selectedSeats={selectedSeats}
                passengerDetails={passengerDetails}
                handlePayment={handlePayment}
                isFormValid={isFormValid}
                handlePassengerFormSubmit={handlePassengerFormSubmit} 
                
            
            />
            
        )}
    
    </div>
    
)}
            {showGoBackButton && (
                <div className="goBack">
                    <br />
                    <button onClick={handleGoBackClick}>Go Back</button>
                </div>
            )}
        
        
            
                
                
        {showTicketModal && selectedTicket && (
                <div className="ticket-modal" style={{display: 'block'}}>
                <div className="ticket-modal-content">
                <span className="close" onClick={closeTicketModal}>&times;</span>
                {/* Render ticket details here */}
                <h2>Ticket Details</h2>
                {selectedTicket.passengers && selectedTicket.passengers.length >  0 && (
                <div>
                    
                    {selectedTicket.passengers.map((passenger, index) => (
                        <div key={index}>
                            
                            <p>Name: {passenger.name}</p>
                            <p>Age: {passenger.age}</p>
                            <p>Seat Number: {passenger.seatNumber}</p>
                        </div>
                    ))}
                </div>
            )}
            <p>Bus Number: {selectedTicket.busNumber}</p>
            <p>Departure Time: {selectedTicket.departureTime}</p>
            <p>Arrival Time: {selectedTicket.arrivalTime}</p>
            <p>Date: {selectedTicket.date}</p>
            <p>Origin: {selectedTicket.origin}</p>
            <p>Destination: {selectedTicket.destination}</p>
            <p>Number of Seats: {selectedTicket.numberOfSeats}</p>
            <p>Booking Date: {selectedTicket.bookingDate}</p>
            <p className={selectedTicket.isBooked ? 'booked' : 'not-booked'}>
                Is Booked: {selectedTicket.isBooked ? 'Yes' : 'No'}
            </p>
            
        </div>
    </div>
    )}


            
            {showTickets && tickets.map((ticket, index) => (
                <TicketCard key={index} ticket={ticket} onTicketClick={handleTicketClick}/>
            ))}

            
        </div>
    );
}







