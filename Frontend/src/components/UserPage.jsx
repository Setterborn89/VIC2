import { useState, useEffect } from "react";
import Ticket from "./Ticket";

function UserPage(){

    const [user, updateUser] = useState({});
    const [tickets, updateTickets] = useState([]);

    useEffect(() => {
        async function loadData() {

            let userResponse = await fetch("/data/login");
            userResponse = await userResponse.json();
            updateUser(userResponse)

            let ticketResponse = await fetch("/data/tickets");
            ticketResponse = await ticketResponse.json();
            ticketResponse.forEach( (ticket) =>{
                if(ticket.userId == userResponse.id){
                    updateTickets(tickets.concat(ticket))
                }
            }) 
        }
        loadData();
    }, []);


    return (<div className="UserPage">
        <div className="UserPageDisplayBox">
            {tickets.map(ticket => (
                <div key={ticket.id}>
                    <Ticket id={ticket.id}/>
                    <a className="UserEventButton" href={"/eventdetails/" + ticket.concertId}>event</a>
                </div>
            ))}
        </div>

        
 
    </div>
    )
    

}

export default UserPage;





