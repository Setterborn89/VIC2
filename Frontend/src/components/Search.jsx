import React,{useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import Filter from "./Filter"
import "../css/Search.css"



function Search(){
    const {search} = useLocation()
    const[artists, setArtists]= useState([])
    const[concerts, setConcerts]= useState([])
    const [filter, setFilter] = useState();

    const queryParams = new URLSearchParams(search)
    const test = (queryParams.get('searchword'))

    useEffect(() => {
        function loadSearchWord(){
            setFilter(test)
        }
        loadSearchWord()
    }, [test])
  
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
            item[key].toString().toLowerCase().includes(filter.toString().toLowerCase())
            )
    });

    let concertSearch = concerts.filter(item=>{
        return Object.keys(item).some(key => 
            item[key].toString().toLowerCase().includes(filter.toString().toLowerCase())
            )
    });

    let searchList = artistSearch.concat(concertSearch)

    return <>
    <div className="container-Search-wrapper">
    <Filter/>

        {searchList.map(item =>(
            item.location == undefined ? 
            <div className="card-Search">
                <div key={item.id + Math.random()} className="Container-card">
                    <div className="card__image-container">
                        <img src={item.image}/>
                    </div>
                    <div className="card__content">
                        <h3 className="card__title text--medium">
                            {item.name}
                        </h3>
                        <a href ={item.wiki} className="text--medium">Read more</a>
                        <div className="card__info">
                            
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
                                            <button className ="card__price text--medium" >
                                            <a href={"/EventDetails/" + concert.id}>Get tickets !</a>
                                            </button>     
                                        </div>
                                    :<p key={concert.id + 1}></p>
                                ))}
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
            :
            <div className="card-Search">
            <div key={item.id + Math.random()} className="card">
                <div className="card__image-container">
                    <img src={item.image}/>
                </div>
                <div className="card__content">
                    <h3 className="card__title text--medium">
                        {item.name}
                    </h3>
                    <a href ={item.wiki} className="text-link">Read more</a>
                    <div className="card__info">
                    
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
                    <button className ="card__price text--medium" >
                        <a href={"/EventDetails/" + item.id}>Get tickets !</a>
                    </button> 
                </div>
            </div>
            </div>
        ))}
        </div>
    </>
}

export default Search

