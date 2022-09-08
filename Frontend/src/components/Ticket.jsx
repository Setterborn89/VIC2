import React, { useState, useEffect } from 'react';

function Ticket(props) {
    
    const id = props.id

    const [data, updateData] = useState({})

    useEffect(() => {     
        async function loadData(){

            let responseData = {
                ticketId: null,
                userId:null,
                concertId:null,
                email:null,
                artistId:null,
                location:null,
                artistName:null
            }

            let response1 = await fetch("/data/tickets/" + id)
            response1 = await response1.json()
            responseData.ticketId= response1.id,
            responseData.userId= response1.userId,
            responseData.concertId= response1.concertId

            let response2 = await fetch("/data/users/" + responseData.userId)
            response2 = await response2.json()
            responseData.email=response2.email

            let response3 = await fetch("/data/concerts/" + responseData.concertId)
            response3 = await response3.json()
            responseData.artistId=response3.artistId,
            responseData.location=response3.location

            let response4 = await fetch("/data/artists/" + responseData.artistId)
            response4 = await response4.json()
            responseData.artistName=response4.name

            updateData(responseData)
        }
        loadData()
        
        
    },[id])
    
        return<div id="ticketComp">
        
        <div id="ticket">
        <a href="#" onClick={window.print} id="printbtn">Print</a>
            <div id="QrCode">
                <img src="https://sv.qr-code-generator.com/wp-content/themes/qr/new_structure/markets/basic_market/generator/dist/generator/assets/images/websiteQRCode_noFrame.png"></img>
            </div>
            <div id="TicketText">
            <h2>{data.email}</h2>
            <h2>{data.artistName}</h2>
            <h2>{data.location}</h2>
            <h2>{data.date}</h2>
            </div>
            <div id="TicketId">
                <p>ticket # {data.ticketId}</p>    
            </div>
        </div>
    </div>

    }

export default Ticket