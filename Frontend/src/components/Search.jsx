import React,{useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import Filter from "./Filter"
import "../css/Search.css"
// import { FcCalendar } from "react-icons/fc";
// import { GoLocation } from "react-icons/go";
// import { HiOutlineTicket} from "react-icons/hi";
// import {MdAttachMoney} from "react-icons/md";
// import { BiMusic } from "react-icons/bi";
// import { FiInfo} from "react-icons/fi";




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
    <div className="row">
    {searchList.map(item =>(
    item.location == undefined ? 
        
            
                <div key={item.id + Math.random()}>
                    <div className="card-Search">
                        <img className="card_poster" src={item.image} />
                        <div className="container">
                            <h3>
                                <b>{item.name}</b>
                            </h3>
                            <a href ={item.wiki} className="text--medium"><FiInfo/> Artist info</a>
                            {concerts.map(concert => (
                                concert.artistId == item.id ?

                                <div key={concert.id + Math.random}>
                                    <div>     
                                        {
                                        concert.stream == true ? <p>Stream </p> : <p>Live</p>
                                        }
                                    </div>
                                    <h3> <FcCalendar/> {concert.date}</h3>
                                    <p><GoLocation/> {concert.location}</p>
                                    <p><MdAttachMoney/> {concert.price} </p>
                                    <h4><BiMusic/> {concert.genre}</h4>

                                    <button className ="card__price text--medium" >
                                    <a href={"/EventDetails/" + concert.id}>Get tickets <HiOutlineTicket/></a>
                                    </button>


                                </div>
                            :<p key={concert.id + 1}></p>
                            ))}
                        </div>
                    </div>
                </div>
           
            :
            
            
                <div key={item.id + Math.random()} className="card-Search">
                    <div className="card-Search">
                        <img className="card_poster" src={item.image} />
                        <div className="container">
                            <h3>
                                <b>{item.name}</b>
                            </h3>
                            <a href ={item.wiki} className="text--medium"><FiInfo/> Artist info</a>
                           

                               
                                    <div>     
                                        {
                                        item.stream == true ? <p>Stream </p> : <p>Live</p>
                                        }
                                    </div>
                                    <h3> <FcCalendar/> {item.date}</h3>
                                    <p><GoLocation/> {item.location}</p>
                                    <p><MdAttachMoney/> {item.price} </p>
                                    <h4><BiMusic/> {item.genre}</h4>

                                    <button className ="card__price text--medium" >
                                    <a href={"/EventDetails/" + item.id}>Get tickets <HiOutlineTicket/></a>
                                    </button>


                           
                        </div>
                    </div>
                </div>
           
        ))}
        </div>
        </div>

    </>
}

export default Search

