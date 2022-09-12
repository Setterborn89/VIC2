import React, { useState, useEffect } from "react";
import "../Css/ticket.css"

function Ticket(props) {
  const id = props.id;
  const [data, updateData] = useState({});

  useEffect(() => {
    async function loadData() {
      let responseData = {
        ticketId: null,
        userId: null,
        concertId: null,
        email: null,
        artistId: null,
        location: null,
        date: null,
        artistName: null,
      };

      let ticketResponse = await fetch("/data/tickets/" + id);
      ticketResponse = await ticketResponse.json();
      (responseData.ticketId = ticketResponse.id),
        (responseData.userId = ticketResponse.userId),
        (responseData.concertId = ticketResponse.concertId);

      let userResponse = await fetch("/data/users/" + responseData.userId);
      userResponse = await userResponse.json();
      responseData.email = userResponse.email;

      let concertResponse = await fetch(
        "/data/concerts/" + responseData.concertId
      );
      concertResponse = await concertResponse.json();
      (responseData.artistId = concertResponse.artistId),
        (responseData.location = concertResponse.location),
        (responseData.date = concertResponse.date);

      let artistResponse = await fetch(
        "/data/artists/" + responseData.artistId
      );
      artistResponse = await artistResponse.json();
      responseData.artistName = artistResponse.name;

      updateData(responseData);
    }
    loadData();
  }, [id]);

  return (
    <div id="ticketComp">
      <div id="ticket">
        <a href="#" onClick={window.print} id="printbtn">
          Print
        </a>
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
  );
}

export default Ticket;
