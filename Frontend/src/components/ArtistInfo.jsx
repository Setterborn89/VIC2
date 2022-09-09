function ArtistInfo() {
  const time = "12:30";
  const eventPlace = "Avicii Arena | Stockholm";
  const artist = "Tove Lo";

  return (
    <>
      <section className="event-image">
        <img src="" alt="artist-image" />
      </section>
      <div className="event-info">
        <div className="event-date">
          <span>Mån</span>
          <span>17</span>
          <span>okt. 2022</span>
        </div>
        <div className="event-details">
          <h1 className="event-title">{artist}</h1>
          <a href="">{eventPlace}</a>
          <h3 className="event-time">Tid: {time}</h3>
        </div>
      </div>
    </>
  );
}

export default ArtistInfo;