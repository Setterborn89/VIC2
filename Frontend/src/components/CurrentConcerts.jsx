
import React, { useState, useEffect } from 'react';

function CurrentConcerts(){

    let [concertList, updateConcertsData] = useState([]);
    useEffect(() => {     
        async function loadData(){

            concertList = []

            let concertsResponse = await fetch("/data/concerts");
            const concertsData = await concertsResponse.json();

            let artistsResponse = await fetch("/data/artists");
            const artistsData = await artistsResponse.json();

            concertsData.forEach(concert => {
                artistsData.forEach( artist =>  {
                    if(concert.artistId == artist.id){
                        concert.artistName = artist.name
                        console.log(artist.name)
                    }
                });
                concertList.push(concert)
            });




            updateConcertsData(concertList)
        }
        loadData()

        console.log(concertList)


    },[])
     

    return <>
        <h2>Upcoming Concerts</h2>
        <h3>Live Concerts</h3>
        <div className="row" >
            <card className="row_cards">

                {concertList.map( element => 
                    <>
                    <div>
                    <img
                        className="row_poster"
                        src={element.image}
                        />
                        <div class="container">
                            <h4><b>{element.artistName}</b></h4>
                            <h3>{element.date}</h3>
                            <p>{element.location}</p>
                        </div>
                    </div>
                    </>
                ) }
            </card>
        </div>
        <h3>Stream Concerts</h3>
        <div className="row" >
            <card className="row_cards">
                {concertList.map( element => 
                    <>
                    <div>
                    <img
                        className="row_poster"
                        src={element.image}
                        />
                        <div class="container">
                            <h4><b>{element.artistName}</b></h4>
                            <h3>{element.date}</h3>
                            <p>{element.location}</p>
                        </div>
                    </div>
                    </>
                ) }
            </card>
        </div>
    </>

}

export default CurrentConcerts;
