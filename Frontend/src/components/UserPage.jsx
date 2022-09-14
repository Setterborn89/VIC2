import { useState, useEffect } from "react";

function UserPage(){

    const [user, updateUser] = useState({});
    const [tickets, updateTickets] = useState([]);
    const [concerts, updateConcerts] = useState([]);

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

            let concertResponse = await fetch("/data/concerts");
            concertResponse = await concertResponse.json();
            concertResponse.forEach((concert) => {
                ticketResponse.forEach((ticket)=> {
                    if(ticket.concertId == concert.id){
                        updateConcerts(concerts.concat(concert))
                    }
                })
            })
        }
        loadData();
    }, []);

    function checkId(id) {
        return concertId = id;
      }
    
    

    return (<div>

        {tickets.map(ticket => (
            <div key={ticket.id}>
                <p>{concerts[concerts.indexOf(concertId=="1")]}</p>
                <a href={"/eventdetails/" + ticket.concertId}>event</a>
                <a href={"/ticket/" + ticket.id}>ticket</a>
            </div>
        ))}

    </div>
    )

}

export default UserPage;





