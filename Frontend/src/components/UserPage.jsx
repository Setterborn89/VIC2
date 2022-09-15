import { useState, useEffect } from "react";
import Ticket from "./Ticket";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

function UserPage(){

    const [user, updateUser] = useState({});
    const [tickets, updateTickets] = useState([]);
    const [contentSelector, updateContentSelector] = useState(1)
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

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
            ticketstoadd.sort((a,b) => Date.parse(a) - Date.parse(b)).reverse()
            updateTickets(ticketstoadd)
            
        }
        loadData();
        
    }, []);

    


    return (<div className="UserPage">
        <div className="WelcomeBox">
            <div className="WelcomeText">
                <h1>Welcome fellow fanatic!</h1>
            </div>
            <div className="WelcomeBtns">
                <a href="#" onClick={() =>updateContentSelector(1)}><h3>Tickets</h3></a>
                <a href="#" onClick={() =>updateContentSelector(2)}><h3>Settings</h3></a>
            </div>
            
        </div>
        <div  className="UserPageDisplayBox">
            {contentSelector==1 ? 
                <div className="UserTickets">
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
                :
                <div className="UserInfo">
                    <div className="CurrentInfo">
                        <form onSubmit={handleUpdateSubmit} className="personalInfoform">
                            <div>
                                <h3 id="update">Update account</h3>
                                <div id="updateform">
                                    <div>
                                        <label htmlFor="firstName">{user.firstName}</label>
                                        <input
                                            type="text"
                                            placeholder="Enter new first name"
                                            name="firstName"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="lastName">{user.lastname}</label>
                                        <input
                                            type="text"
                                            placeholder="Enter new last name"
                                            name="lastName"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email">{user.email}</label>
                                        <input
                                            type="email"
                                            placeholder="Enter new e-mail"
                                            name="emailAdress"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <button>Update</button>
                                </div>
                            </div>
                        </form>
                        <div>
                            <h3 id="updatePassword">Update password</h3>
                            <form onSubmit={handleUpdateSubmit} className="passwordForm">
                                <div>
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        placeholder="Enter new password"
                                        name="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="confirmPassword">Confirm password</label>
                                    <input
                                        type="password"
                                        placeholder="Confirm password"
                                        name="confirmPassword"
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                {password == confirmPassword ? (
                                    <button>Update</button>
                                ) : (
                                    "Password doesn't match"
                                )}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            }
        </div>
    </div>
    )

    
    

}

export default UserPage;





