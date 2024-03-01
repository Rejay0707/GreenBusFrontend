// import { Children } from "react"
import { Link,useMatch,useResolvedPath } from "react-router-dom"

export default function Navbar(){
    
    return(
        <nav className="nav">
        <Link to="/" className="bus-title">GreenBus</Link>
        <ul>
            <CustomLink to="/help">Help</CustomLink>
                <CustomLink to="/account">Account</CustomLink>
                <CustomLink to="/busManagement">BusTicketManagement</CustomLink>
            
        </ul>
    </nav> 
    )
}

function CustomLink({to,children,...props}){
    // const path=window.location.pathname
    const resolvedPath=useResolvedPath(to)
    const isActive=useMatch({path:resolvedPath.pathname,end:true})

    return(
    <li className={isActive?"active":""}>
        <Link to={to} {...props}>{children}</Link>
    </li>
    )
    
}