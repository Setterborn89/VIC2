function ArtistInfo(props) {
  const event = props.event;
  const time = "20:30";

  return (
    <>
      <div className="artistInfo>">
          <img src="" />
        <div className="event-info">
          <div className="event-date">
            <span>{event.date}</span>
          </div>
          <div className="event-details">
            <h1 className="event-title">{event.artistName}</h1>
            <a href="">{event.location}</a>
            <h3 className="event-time">Tid: {time}</h3>
          </div>
        </div>
      </div>
    </>
  );
}

export default ArtistInfo;
