import React,{useState, useEffect} from 'react';

function Search(){
    const[artists, setArtists]= useState([])
    const[concerts, setConcerts]= useState([])
    const [filter, setFilter] = useState('');
    const searchText = (event) =>{
        setFilter(event.target.value)
    }
  
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
    return <>

        <div className="search-bar">
          <input type ="text" placeholder="Search" value={filter} onChange={searchText.bind(this)} />
        </div>
{/*         
        <div className="output">
            {artistSearch.map(artist =>(
                <div key={artist.id} className="card">
                    <img src={artist.image} alt="" style={{width:'100%'}}/>
                    <div className="container">
                        <h4><b>{artist.name}</b></h4>
                        <p>Read more about the artist:{artist.wiki}</p>
                        {concertSearch.filter(concert => concert.artistId == artist.id).map(concert => (
                            
                            <div key={concert.id} className="card-concert">
                                 <h4><b>{concert.location}</b></h4>
                                 <h4><b>Ticket price {concert.price} $</b></h4>
                                 <h4><b>{concert.genre} </b></h4>
                                 
                               
                                    
                        
                            </div>
                        ))}
                    </div>
                </div>     
            ))}
        </div> */}

    {artistSearch.map(artist =>(
    
    <div key={artist.id} class="card">
      <div class="card__image-container">
        <img
          src={artist.image}
        />
      </div>
      <div class="card__content">
        <h3 class="card__title text--medium">
          {artist.name}
        </h3>
        <a href ={artist.wiki} class="text--medium">Read more</a>
        
        <div class="card__info">
          
           
          {concertSearch.filter(concert => concert.artistId == artist.id).map(concert => (
                <div key={concert.id} className="card-concert">
                    <div>     
                     {/* {
                       ({concert.stream})=== true ? <p>Stream </p> : <p>Live</p>
                     }  */}
                    </div>
                     
                    <p class="text--medium">Location: {concert.location}</p>
                    <p class="text--medium">Date: {concert.date} </p>
                    <p class="text--medium">Price: {concert.price} $ </p>
                    <p class="text--medium">Genre: {concert.genre}</p> 
                    <p class="card__price text--medium">Get Tickets</p>
                    
                                
                </div>
                        ))}

        </div>
      </div>
    </div>
    ))}
    
    </>
       
    

}

export default Search

