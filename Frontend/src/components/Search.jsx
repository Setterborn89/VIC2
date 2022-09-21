import React,{useState, useEffect} from 'react';
import { useLocation, Link } from 'react-router-dom';
import Filter from "./Filter"
import "../css/Search.css"
import { FcCalendar } from "react-icons/fc";
import { GoLocation } from "react-icons/go";
import { HiOutlineTicket} from "react-icons/hi";
import {BsCashCoin} from "react-icons/bs";
import { BiMusic } from "react-icons/bi";
import { FiInfo} from "react-icons/fi";
import { Carousel } from 'react-responsive-carousel';

function Search(){
    const {search} = useLocation()
    const[artists, setArtists]= useState([])
    const[concerts, setConcerts]= useState([])
    const [filter, setFilter] = useState();
    const [filterGenre, setFilterGenre] = useState([]);
    const [searchList, setSearchList] = useState([]);
    const[activeGenre, setActiveGenre]= useState("all");

    const queryParams = new URLSearchParams(search)
    const test = (queryParams.get('searchword'))

    const sortConcerts = (id) => {
        let temp = []
        concerts.forEach(concert => {
            if(concert.artistId == id)  temp.push(concert)
        })
        return temp
    };

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
        if(artists.length === 0) return;
        
        async function loadConcerts(){
            let response =  await fetch("/data/concerts")
            response= await response.json()
            response.map(concert => {
                const matchingArtist = artists.find(artist => artist.id == concert.artistId);
                concert.artistName = matchingArtist ? matchingArtist.name : "artist not found";
                return concert;
            });
            setConcerts(response)
        }
        loadConcerts()
    }, [artists])

    useEffect(() => {
        function filterSearchList(){
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
            
            setFilterGenre(searchList)
            setSearchList(searchList)
        }
        filterSearchList()
        
    }, [test]);

    return <div className="container-Search-wrapper">
        <Filter searchList={searchList} setFilterGenre={setFilterGenre} activeGenre={activeGenre} setActiveGenre={setActiveGenre}/>
        <div className="row">
            {filterGenre.map(item =>(
            item.location == undefined ? 
                <div className="card-Search" key={item.id + Math.random()}>
                    <img className="card_poster" src={item.image} />
                    <div className="container">
                        <h2>Artist</h2>
                        <h3>
                            <b>{item.name}</b>
                        </h3>
                        <a href ={item.wiki} className="text--medium"><FiInfo/> Artist info</a>
                        <hr className="searchLine"/>
                        <Carousel showThumbs={false}>
                            {sortConcerts(item.id).map(concert => (
                                <div key={concert.id + Math.random}>
                                    <div>     
                                        {
                                        concert.stream == true ? <p>Stream </p> : <p>Live</p>
                                        }
                                    </div>
                                    
                                    <h3> <FcCalendar/> {concert.date.substring(0, 16)}</h3>
                                    <p><GoLocation/> {concert.location}</p>
                                    <p><BsCashCoin/> {concert.price} SEK</p>
                                    <h4><BiMusic/> {concert.genre}</h4>
                                    <button className ="card__price text--medium" >
                                    <Link to={"/ConcertComponent/"+ concert.id}>Get tickets <HiOutlineTicket/></Link>
                                    </button>
                                    <hr className="searchLine"/>
                                </div>
                            ))}
                        </Carousel>
                    </div>
                </div>
            :
                <div key={item.id + Math.random()} className="card-Search">
                    <img className="card_poster" src={item.image} />
                    <div className="container">
                        <h2>Concert</h2>
                        
                        <h3>
                            {<b>{item.artistName}</b>}
                        </h3>
                        <a href ={item.wiki} className="text--medium"><FiInfo/> Artist info</a>
                        <hr className="searchLine"/>
                        <div>     
                            {
                            item.stream == true ? <p>Stream </p> : <p>Live</p>
                            }
                        </div>
                        <h3> <FcCalendar/> {item.date.substring(0, 16)}</h3>
                        <p><GoLocation/> {item.location}</p>
                        <p><BsCashCoin/> {item.price} SEK</p>
                        <h4><BiMusic/> {item.genre}</h4>
                        <button className ="card__price text--medium" >
                        <Link to={"/ConcertComponent/"+ item.id}>Get tickets <HiOutlineTicket/></Link>
                        </button>
                        <hr className="searchLine"/>
                    </div>
                </div>
            ))}
        </div>
    </div>
} 

export default Search

