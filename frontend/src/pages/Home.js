import React from "react";
import img from '../images/Green Bus.jpg';


export default function Home() {
    return (
        
        <div className="style">
        <p className="note"> For booking a ticket and viewing ticket details, click on Bus Ticket Management.</p>
        <div className="container">
            
            
            
            <div className="image-text-wrapper">
                <img src={img} alt="Green Bus" className="busImage"/>
                <p className="quote">Travelling shouldn't be just a tour, it should be a tale.<br />Travel teaches as much as a teacher.
                </p>
            </div>
        </div>
        </div>
    );
}
