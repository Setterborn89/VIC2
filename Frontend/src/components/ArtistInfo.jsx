import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GoLocation } from "react-icons/go";
import { GoClock } from "react-icons/go";
import "../css/eventdetails.css";
import Slider from "./Slider"
import song from "./audio/independent state-filioque.mp3"
 

function ArtistInfo() {
  const [event, setEvent] = useState({});
  const { id } = useParams();
  const googleMapsUrl = "https://www.google.com/maps/search/?api=1&query=$";
  const [percentage, setPercentage] = useState(0)
  const onChange = (e) => {
   
    setPercentage(e.target.value)
  }

  useEffect(() => {
    async function loadEvent() {
      let eventData = {
        artistName: null,
        artistId: null,
        location: null,
        date: null,
        price: null,
        image: null,
        seats: null,
        time: null,
        sampleSong: null,
      };

      let eventResponse = await fetch("/data/concerts/" + id);
      let eventResult = await eventResponse.json();
      eventData.location = eventResult.location;
      eventData.price = eventResult.price;
      eventData.date = new Date(eventResult.date).toDateString();
      eventData.artistId = eventResult.artistId;
      eventData.seats = eventResult.seats;
      eventData.image = eventResult.image;
      eventData.time = eventResult.date.substring(11, 16);
      eventData.sampleSong = eventResult.sampleSong;

      let artistResponse = await fetch("/data/artists/" + eventData.artistId);
      let artistResult = await artistResponse.json();
      eventData.artistName = artistResult.name;
      setEvent(eventData);
    }
    loadEvent();
  }, []);

  return (
    <>
      <div className="artistInfo">
        <img src={event.image} />
        <div className="event-info">
          <div className="event-date">
            <span>{event.date}</span>
            
          </div>
         
          
          <div className="event-details">
            <h1 className="event-title">{event.artistName}</h1>
            <a href={googleMapsUrl + event.location} className="event-location">
              <GoLocation />
              {event.location}
            </a>
            <p className="event-time">
              <GoClock /> {event.time}
            </p>
            <div className="app-container">
              <Slider percentage={percentage} onChange={onChange}/>
              <audio
      
        src={song}
        controls
      ></audio>
    

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ArtistInfo;
