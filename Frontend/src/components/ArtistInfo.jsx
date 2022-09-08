function ArtistInfo() {
  const time = "12:30";
  const eventPlace = "Avicii Arena | Stockholm";
  const artist = "Tove Lo";
  const imgPath = 'https://cdn01.modette.se/298d0c8e04d802840100000000d8028401/2021/11/09/1687968/konserter-stockholm-2022.jpg'

  return (
    <>
      <section className="event-image" style={{backgroundImage: `url(${imgPath})`}}>
        <img src="" />
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