import "../css/Filter.css"
import {useEffect} from "react";
function Filter(props) {
  useEffect(() => {
    
    if(props.activeGenre === "all"){
      props.setFilterGenre(props.searchList);
      return;
    }
   
    const filtered = props.searchList.filter((item) => 
   
    item.genre.includes(props.activeGenre)
    );
   console.log(filtered);
    props.setFilterGenre(filtered);

  }, [props.activeGenre])
  return <>
  
    
    
    <nav className="Navbar"> 
     
    <h4 >ADDITIONAL FILTERS </h4>

   
    

    <button className = {props.activeGenre === "all" ? "active" : ""} onClick={() => props.setActiveGenre("all")}>All</button>
   <button className = {props.activeGenre === "pop" ? "active" : ""} onClick={() => props.setActiveGenre("pop")}>Pop</button>
   <button className = {props.activeGenre === "hiphop" ? "active" : ""} onClick={() => props.setActiveGenre("hiphop")}>hiphop</button>
   <button className = {props.activeGenre === "rap" ? "active" : ""} onClick={() => props.setActiveGenre("rap")}>rap</button>
    </nav>

 
  
 

  </>
}
export default Filter