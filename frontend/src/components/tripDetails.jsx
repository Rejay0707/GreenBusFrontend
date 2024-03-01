import React from 'react';

const TripDetails = ({ trip }) => {
    return (
        <div className="trip-details">
            <p>Origin: {trip.origin}</p>
            <p>Destination: {trip.destination}</p>
            <p>Date: {new Date(trip.date).toLocaleDateString()}</p>
            <p>Available Seats: {trip.availableSeats}</p>
            <button disabled={trip.availableSeats ===  0}>Book Seat</button>
        </div>
    );
};

export default TripDetails;
