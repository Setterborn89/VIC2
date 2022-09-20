import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { GoLocation } from "react-icons/go";
import { GoClock } from "react-icons/go";
import "../css/eventdetails.css";
import Slider from "./Slider"
// import song from "../audio/independent state-filioque.mp3"
import ControlPanel from '../components/AudioControl/ControlPanel'
import { BiMusic } from "react-icons/bi";

function ArtistInfo() {
  const [event, setEvent] = useState(null);
  const { id } = useParams();
  const googleMapsUrl = "https://www.google.com/maps/search/?api=1&query=$";
  // mediaplayer
  const [percentage, setPercentage] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const audioRef = useRef()
  const onChange = (e) => {
    const audio = audioRef.current
    audio.currentTime = (audio.duration / 100) * e.target.value
    setPercentage(e.target.value)
  }

  const play = () => {
    const audio = audioRef.current
    audio.volume = 0.1

    if (!isPlaying) {
      setIsPlaying(true)
      audio.play()
    }

    if (isPlaying) {
      setIsPlaying(false)
      audio.pause()
    }
  }

  const getCurrDuration = (e) => {
    if (!e.currentTarget.duration || isNaN(e.currentTarget.duration)) {
      return;
    }
    const percent = ((e.currentTarget.currentTime / e.currentTarget.duration) * 100).toFixed(2)
    const time = e.currentTarget.currentTime

    setPercentage(+percent)
    setCurrentTime(time.toFixed(2))
  }

  // mediaplayer stop

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
        sampleMusic: null,
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
      eventData.sampleMusic = eventResult.audioId;

      let artistResponse = await fetch("/data/artists/" + eventData.artistId);
      let artistResult = await artistResponse.json();
      eventData.artistName = artistResult.name;
      setEvent(eventData);
      console.log(eventData);
    }
    loadEvent();
  }, []);

  if (!event) return;

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
            <p>Preview music <BiMusic/></p>

            <div className="app-container">
            <h6 className="detail-player">Audio Player: {event.artistName}</h6>
              <Slider percentage={percentage} onChange={onChange}/>
              <audio
              ref={audioRef}
              onTimeUpdate={getCurrDuration}
              onLoadedData={(e) => {
                setDuration(e.currentTarget.duration.toFixed(2))
              }}
              src={"/data/audio-stream/" + event.sampleMusic}
              ></audio>
              <ControlPanel
              play={play}
              isPlaying={isPlaying}
              duration={duration}
              currentTime={currentTime}
              />
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default ArtistInfo;
