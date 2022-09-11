import ArtistInfo from "./ArtistInfo";
import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";

function ConcertComponent(){
const [data, updateData] = useState([{}])

const { search } = useLocation();
const queryParams = new URLSearchParams(search);
const id = queryParams.get('id')
console.log(id)

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
                    <a href={"/LiveConcerts?id=" + id}>Buy Tickets</a>
                </button>
            </div>
        </div>

            <div className="moreConcerts">
                <h1>Additional Concerts</h1>

                {data[0].location != undefined ?               
                data.map(conserts =>
                    <section key={conserts.id}>   
                        <a href={"/streamconcerts?id=" + conserts.id} className="concert-location">{conserts.location}</a>
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