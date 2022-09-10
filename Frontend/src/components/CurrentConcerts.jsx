
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

                for(const artist of artistsData){
                    if(concert.artistId == artist.id){
                        concert.artistName = artist.name;
                        break;
                    }else{
                        concert.artistName = "artist not found"
                    }
                };

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
                        <a href={"/test?Id=" + element.id}>
                            <div className="card">
                            <img
                                className="card_poster"
                                src={element.image}
                                />
                                <div class="container">
                                    <h4><b>{element.artistName}</b></h4>
                                    <h3>{element.date}</h3>
                                    <p>{element.location}</p>
                                </div>
                            </div>
                        </a>
                    </>
                ) }
            </card>
        </div>
        <h3>Stream Concerts</h3>    
        <div className="row" >
            <card className="row_cards">
                {concertList.map( element => 
                    <>
                        <a href={"/test?Id=" + element.id}>
                            <div className="card">
                            <img
                                className="card_poster"
                                src={element.image}
                                />
                                <div class="container">
                                    <h4><b>{element.artistName}</b></h4>
                                    <h3>{element.date}</h3>
                                    <p>{element.location}</p>
                                </div>
                            </div>
                        </a>
                    </>
                ) }
            </card>
        </div>
    </>

}

export default CurrentConcerts;
