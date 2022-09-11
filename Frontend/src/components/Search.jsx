import React,{useState, useEffect} from 'react';
import Filter from './Filter'


function Search(props){
    const[artists, setArtists]= useState([])
    const[concerts, setConcerts]= useState([])
   
  
    useEffect(() => {
        async function loadArtists(){
            let response =  await fetch("/data/artists")
            response= await response.json()
            setArtists(response)
        }
        loadArtists()
    }, [])

    useEffect(() => {
        async function loadConcerts(){
            let response =  await fetch("/data/concerts")
            response= await response.json()
            setConcerts(response)
        }
        loadConcerts()
    }, [])

    

    let artistSearch = artists.filter(item=>{
        return Object.keys(item).some(key => 
            item[key].toString().toLowerCase().includes(props.input)
            )
    });

    let concertSearch = concerts.filter(item=>{
        return Object.keys(item).some(key => 
            item[key].toString().toLowerCase().includes(props.input)
            )
    });

    let searchList = artistSearch.concat(concertSearch)

    return <>
    <Filter/>
        {searchList.map(item =>(
            item.location == undefined ? 
                <div key={item.id + Math.random()} className="card">
                    <div className="card__image-container">
                        <img src={item.image}/>
                    </div>
                    <div className="card__content">
                        <h3 className="card__title text--medium">
                            {item.name}
                        </h3>
                        <a href ={item.wiki} className="text--medium">Read more</a>
                        <div className="card__info">
                            <p className="text--medium">Read more about the artist</p>
                            <div>
                                {concerts.map(concert => (
                                    concert.artistId == item.id ?
                                        <div key={concert.id + Math.random} className="card-concert">
                                            <div>     
                                                {
                                                concert.stream == true ? <p>Stream </p> : <p>Live</p>
                                                }
                                            </div>
                                            <p className="text--medium">Location: {concert.location}</p>
                                            <p className="text--medium">Date: {concert.date} </p>
                                            <p className="text--medium">Price: {concert.price} $ </p>
                                            <p className="text--medium">Genre: {concert.genre}</p> 
                                            <p className="card__price text--medium">Get Tickets</p>      
                                        </div>
                                    :<p key={concert.id + 1}></p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            :
            <div key={item.id + Math.random()} className="card">
                <div className="card__image-container">
                    <img src={item.image}/>
                </div>
                <div className="card__content">
                    <h3 className="card__title text--medium">
                        {item.name}
                    </h3>
                    <a href ={item.wiki} className="text--medium">Read more</a>
                    <div className="card__info">
                        <p className="text--medium">Read more about the artist</p>
                    </div>
                </div>
                <div className="card-concert">
                    <div>     
                        {
                            item.stream == "true" ? 
                            <p>Stream</p> 
                            :
                            <p>Live</p>
                        }
                    </div> 
                    <p className="text--medium">Location: {item.location}</p>
                    <p className="text--medium">Date: {item.date} </p>
                    <p className="text--medium">Price: {item.price} $ </p>
                    <p className="text--medium">Genre: {item.genre}</p> 
                    <p className="card__price text--medium">Get Tickets</p>
                </div>
            </div>
        ))}
        
    </>
}

export default Search

