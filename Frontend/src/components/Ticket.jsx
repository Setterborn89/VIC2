import React, { useState, useEffect } from 'react';

function Ticket(props) {
    
    const id = props.id
    let dataLoaded = false;

    const [data, updateData] = useState()
    const [user, updateUser] = useState({})
    const [concert, updateConcert] = useState({})
    const [artist, updateArtist] = useState({})

    useEffect(() => {     
        async function loadData(){
            let response1 = await fetch("/data/tickets/" + id)
            response1 = await response1.json()
            updateData(response1) 

            let response2 = await fetch("/data/users/" + data.userId)
            response2 = await response2.json()
            updateUser(response2)

            console.log(data.concertId)
            let response3 = await fetch("/data/concerts/" + data.concertId)
            response3 = await response3.json()
            updateConcert(response3)
            
            let response4 = await fetch("/data/artists/" + concert.artistId)
            response4 = await response4.json()
            updateArtist(response4)
        }
        loadData()
        if(data != undefined && user != undefined && concert != undefined && artist != undefined){
            dataLoaded = true;
        }
        
        
    },[id])
    
    if(dataLoaded=true){
        return<div id="ticketComp">
        
        <div id="ticket">
        <a href="#" onClick={window.print} id="printbtn">Print</a>
            <div id="QrCode">
                <img src="https://sv.qr-code-generator.com/wp-content/themes/qr/new_structure/markets/basic_market/generator/dist/generator/assets/images/websiteQRCode_noFrame.png"></img>
            </div>
            <div id="TicketText">
            <h2>{user.email}</h2>
            <h2>{artist.name}</h2>
            <h2>{data.concertId}</h2>
            <h2>{concert.location}</h2>
            <h2>{concert.date}</h2>
            </div>
            <div id="TicketId">
                <p>ticket # {data.id}</p>    
            </div>
        </div>
    </div>

    }
    
    
}

export default Ticket