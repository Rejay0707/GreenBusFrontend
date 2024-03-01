import React from 'react';

const PaymentForm = ({ totalAmount, selectedSeats, passengerDetails, handlePayment,  handlePassengerFormSubmit}) => {
    return (
        <div className="payment-info">
            <p>Total Amount: Rs{totalAmount.toFixed(2)}</p>
            <p>Selected Seats: {selectedSeats.join(', ')}</p>
            {selectedSeats.map((seatNumber, index) => (
                <div key={seatNumber} className="passenger-form">
                    <div className='name' >
                    <label for={`name-${seatNumber}`}>Name:</label>
                    <input
                        type="text"
                        id={`name-${seatNumber}`}
                        name="name"
                        value={passengerDetails[index]?.name || ''}
                        onChange={handlePassengerFormSubmit(index, 'name')}
                        required
                    />
                    </div>
                    <label htmlFor={`age-${seatNumber}`}>Age: </label>
                    <input
                        type="number"
                        id={`age-${seatNumber}`}
                        name="age"
                        value={passengerDetails[index]?.age || ''}
                        onChange={handlePassengerFormSubmit(index, 'age')}
                        required
                        
                    />
                    
                </div>
                
            ))}
            <br />
            <button onClick={handlePayment} >Payment</button>
        </div>
    );
};

export default PaymentForm;


