import { useState, useEffect } from "react";
import Ticket from "./Ticket";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

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
            let ticketstoadd = [];
            ticketResponse.forEach( (ticket) =>{
                if(ticket.userId == userResponse.id){
                    ticketstoadd.push(ticket)
                    
                }
            }) 
            ticketstoadd.sort((a,b) => Date.parse(b) - Date.parse(a))
            updateTickets(ticketstoadd)
            
        }
        loadData();
        
    }, []);

    return (<div className="UserPage">
        <div  className="UserPageDisplayBox">
            <Carousel showThumbs={false}>
            {tickets.map(ticket => (
                    <div key={ticket.id} className="slide">
                        <div className="UserEventButton">
                            <a href={"/eventdetails/" + ticket.concertId}>View concert</a>
                            <a href={"/ticket/" + ticket.id}>View ticket</a>
                        </div>
                        <div className="ticketBox">
                            <Ticket id={ticket.id}/>
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    </div>
    )

    
    

}

export default UserPage;





