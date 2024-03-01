import React from "react"
import img2 from '../images/help.jpeg'


export default function Help(){
    return(
        <>
    {/* <h1>Help Line</h1> */}
    <div>
    <img src={img2} alt=""className="full-screen-image" />
    </div>
    <div className="help">
    <p><span>Customer Care Number</span>:7397702155,<span>Landline Number</span>:2233444555</p>
    </div>
    </>
    )
}