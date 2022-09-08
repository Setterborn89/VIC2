import ArtistInfo from "./ArtistInfo";



function ConcertComponent(){

    return<>
   <div className="concert">

    <div className="concertPicture" >        
        <ArtistInfo />  
    </div>   
        <div className="ticketPrice">
            <div>
            <a href="/LiveConcerts" className="redirect-buy">Buy Tickets</a>
            </div>
        </div>
            <div className="moreConcerts">
                <h1>Additional Concerts</h1>
            </div>
    </div> 
    </>
}

export default ConcertComponent