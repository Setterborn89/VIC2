
import React, { useState, useEffect } from 'react';

function CurrentConcerts(){

    const [concerts, updateData] = useState([])

    useEffect(() => {     
        async function loadData(){

            let responseData = [{}]

            let concertsResponse = await fetch("/data/concerts")
            responseData = await concertsResponse.json()

            updateData(responseData)
        }
        loadData()
    })
     

    return <>
        <h2>Upcoming Concerts</h2>
        <h3>Live Concerts</h3>
        <div className="row" >
            <card className="row_cards">
                {concerts.map( element => 
                    <>
                        <img
                        className="row_poster"
                        src={element.image}
                        />
                        <div class="container">
                            <h4><b>{element.artistId}</b></h4>
                            <h3>{element.date}</h3>
                            <p>{element.location}</p>
                        </div>
                    </>
                ) }
            </card>
        </div>
        <h3>Stream Concerts</h3>
        <div className="row" >
            <card className="row_cards">
                {concerts.map( element => 
                    <>
                        <img
                        className="row_poster"
                        src={element.image}
                        />
                        <div class="container">
                            <h4><b>{element.artist}</b></h4>
                            <h3>{element.date}</h3>
                            <p>{element.location}</p>
                        </div>
                    </>
                ) }
            </card>
        </div>
    </>

}

export default CurrentConcerts;
