import ArtistInfo from "./ArtistInfo";
import React, { useState, useEffect } from 'react';
import { userLocation } from "react-router-dom";

function ConcertComponent(){
const [data, updateData] = useState([{}])
const { consert } = userLocation();
const queryParams = new URLSearchParams(consert);
const id = queryParams.get('id')

useEffect(() => {     
    async function loadData(){

        let concertResponse = await fetch("/data/concerts/")
        concertResponse = await concertResponse.json()
        
        let array = [];

            concertResponse.map(pickConcerts)

function pickConcerts(item){

    if(item.artistId==id){
        console.log(item)
        array.push(item)
    }
}
        updateData(array)
    }
    loadData()
},[id])

      
    return<>
    
   <div className="event-container">
    <ArtistInfo />   
    <div className="concert">
        <div className="ticketPrice">
            <div>
                <button>
                    <a href="/LiveConcerts">Buy Tickets</a>
                </button>
            </div>
        </div>

            <div className="moreConcerts">
                <h1>Additional Concerts</h1>

                {data[0].location != undefined ?               
                data.map(conserts =>
                    <section key={conserts.id}>   
                        <a href={"/Concerts?id=" + conserts.id} className="concert-location">{conserts.location}</a>
                        <p className="concert-date">Date: {conserts.date}</p>
                     </section>                                                                      
                        ) : <p></p> 
                }
                                                 
            </div>
        </div>    
    </div> 
    </>
}

export default ConcertComponent; 