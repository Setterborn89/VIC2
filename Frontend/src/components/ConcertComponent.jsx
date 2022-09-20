import ArtistInfo from "./ArtistInfo";
import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { useUserContext } from "../contexts/useUserContext";
import Slider from "./Slider"
// import song from "../audio/independent state-filioque.mp3"
import ControlPanel from '../components/AudioControl/ControlPanel'
import { BiMusic } from "react-icons/bi";

function ConcertComponent() {
  const [data, updateData] = useState([]);
  const { id } = useParams();
  const { loggedIn } = useUserContext();
  const [artistsRes, setArtistsRes] = useState();
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


  useEffect(() => {
    async function loadData() {
      let concertResponse = await fetch("/data/concerts/");
      concertResponse = await concertResponse.json();
      // let artistResponse = await fetch("/data/artists/" + id);
      // let artistResult = await artistResponse.json();
      // setArtistsRes(artistResult.au)

      let array = [];

      concertResponse.map(pickConcerts);

      function pickConcerts(item) {
        if (item.artistId == id) {
          array.push(item);
        }
      }
      updateData(array);
    }
    loadData();
  }, [id]);

  if (!data || !data.length) { return; }

  return (
    <>
      <div className="event-container">
        <ArtistInfo />
        <p>Preview music <BiMusic/></p>
            <div className="app-container">
             
            <ControlPanel
              play={play}
              isPlaying={isPlaying}
              duration={duration}
              currentTime={currentTime}
              >

                <Slider percentage={percentage} onChange={onChange}/>
              </ControlPanel>
              <audio
              ref={audioRef}
              onTimeUpdate={getCurrDuration}
              onLoadedData={(e) => {
                setDuration(e.currentTarget.duration.toFixed(2))
              }}
              src={"/data/audio-stream/" + data[0].audioId}
              ></audio>
             
            </div>
        <div className="concert">
          <div className="ticketPrice">


            
            
            {loggedIn ? (
              <button>
                <Link to={"/eventdetails/" + id}>Buy Tickets</Link>
              </button>
            ) : (
              <p>Sign in to get tickets!</p>
            )}
          </div>

          <div className="moreConcerts">
            {data[0].location != undefined ? (
              data.map((conserts) => (
                <section key={conserts.id}>
                  {conserts.id == id ? (
                    <p></p>
                  ) : (
                    <div>
                      <h3>Additional Conserts </h3>
                      <Link
                        to={"/streamconcerts/" + conserts.id}
                        className="concert-location"
                      >
                        {conserts.location}
                      </Link>
                      <p className="concert-date">Date: {conserts.date}</p>
                    </div>
                  )}
                </section>
              ))
            ) : (
              <p></p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ConcertComponent;
