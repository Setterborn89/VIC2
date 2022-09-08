import ArtistInfo from "./ArtistInfo";



function ConcertComponent(){

    return<>
   <div className="concert">

    <div className="concertPicture" >        
        <ArtistInfo />  
    </div>   
        <div className="ticketPrice">
            <div>
                <button>
                    <a href="/LiveConcerts">Buy Tickets</a>
                </button>
            </div>
        </div>
            <div className="moreConcerts">
                <h1>Additional Concerts</h1>
                <ul>
                    <p>Loopa</p>
                    <p>En</p>
                    <p>Lista</p>
                    <p>Här</p>
                </ul>
            </div>
    </div> 
    </>
}

export default ConcertComponent